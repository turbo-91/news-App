import styled from "styled-components";
import Image from "next/legacy/image";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import newsAppThumbnail from "/assets/news-app-thumbnail.png";
import { Bookmark, BookmarkCheck } from "lucide-react";
import useLocalStorageState from "use-local-storage-state";
import OpenAI from "openai";
import { BeatLoader } from "react-spinners";

const IconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Card = styled.div`
  position: relative;
  background-color: #fff;
  padding: 1rem;
  overflow: hidden; /* Ensure the button doesn't overflow outside the card */
`;

const Title = styled.h2`
  font-family: Bookman, Garamond, serif;
  font-size: 1.3em;
  margin-bottom: 8px;
  color: #001233;
  text-align: justify;
`;

const Description = styled.p`
  color: #001233;
  margin: 8px 0;
  text-align: justify;
  font-size: 1em;
  font-family: Helvetica, Arial, sans-serif;
`;

const DescriptionTranslated = styled.p`
  color: black;
  margin: 8px 0;
  text-align: justify;
  font-size: 1em;
  font-family: Helvetica, Arial, sans-serif;
  font-style: italic;
`;

const Author = styled.p`
  margin: 8px 0;
  color: #001233;
  font-family: Helvetica, Arial;
  text-align: left; /* Align left */
`;

const PublishedAt = styled.p`
  color: #001233;
  margin: 8px 0;
  font-family: Helvetica, Arial;
  text-align: left; /* Align left */
`;

const StyledStrong = styled.strong`
  color: #001233;
`;

const FavoriteButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const TranslateButton = styled.button`
  background-color: #001233;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 1rem;
  font-family: Helvetica, Arial, sans-serif;
  align-self: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const LoaderContainer = styled.div`
  margin-top: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function ArticleCard({
  article,
  favoriteState,
  setFavoriteState,
}) {
  // bypass next/Image components domain restriction! Caution! Security concern.
  const customLoader = ({ src }) => {
    return src;
  };

  ///////////////// Favorite Functionality /////////////////////////////////

  // make session available for favorite button
  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const {
    source: { id: sourceId, name: sourceName },
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
    __v,
  } = article;

  function toggleFavorite(article) {
    const favoriteArticle = {
      source: { id: sourceId, name: sourceName },
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
      __v,
      userId: session.user.userId,
      isFavorite: true,
    };

    const existingFavorite = favoriteState.find(
      (faveArticle) =>
        faveArticle.url === favoriteArticle.url && faveArticle.userId === userId
    );
    if (existingFavorite) {
      // Toggle the existing favorite's isFavorite status
      return favoriteState.map((faveArticle) =>
        faveArticle.url === url && faveArticle.userId === userId
          ? { ...faveArticle, isFavorite: !faveArticle.isFavorite }
          : faveArticle
      );
    } else {
      return [...favoriteState, favoriteArticle];
    }
  }

  function handleToggleFavorite(article) {
    const updatedArticles = toggleFavorite(article);
    setFavoriteState(updatedArticles);
  }

  function isFavorite(favoriteState, article) {
    return favoriteState.find((faveArticle) => faveArticle.url === article.url)
      ?.isFavorite;
  }

  //////////////////// TRANSLATE FEATURE  ////////////////////////////

  const [thisArticle, setThisArticle] = useState(article);
  const [translatedArticle, setTranslatedArticle] = useState("");
  const [isTranslated, setIsTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  async function translate() {
    setIsTranslating(true);
    if (isTranslated) {
      setIsTranslated(false);
      setTranslatedArticle("");
      return;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert data translator. You will be provided a news article in a foreign language. Start with "The title translates to:'article.title', then give a summary of what it is about.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            source: {
              id: thisArticle.source.id,
              name: thisArticle.source.name,
            },
            _id: thisArticle._id,
            author: thisArticle.author,
            title: thisArticle.title,
            description: thisArticle.description,
            url: thisArticle.url,
            urlToImage: thisArticle.urlToImage,
            publishedAt: thisArticle.publishedAt,
            userId: thisArticle.userId,
            __v: thisArticle.__v,
          }),
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
    });
    const translatedContent = response.choices[0].message.content;
    setIsTranslating(false);
    setTranslatedArticle(translatedContent);
    setIsTranslated(true);
  }

  return (
    <Card>
      {article.urlToImage ? (
        <Image
          unoptimized={customLoader}
          src={article.urlToImage}
          alt={article.title}
          layout="responsive"
          width={700}
          height={400}
        />
      ) : (
        <Image
          unoptimized={customLoader}
          src={newsAppThumbnail}
          alt="Default Image"
          layout="responsive"
          width={700}
          height={400}
        />
      )}
      {session && (
        <FavoriteButton onClick={handleToggleFavorite}>
          {isFavorite(favoriteState, article) ? (
            <IconWrapper>
              <BookmarkCheck color="#FAF9F6" size={35} strokeWidth={1} />
            </IconWrapper>
          ) : (
            <IconWrapper>
              <Bookmark
                fill="#FAF9F6"
                color="#FAF9F6"
                size={35}
                strokeWidth={1}
              />
            </IconWrapper>
          )}
        </FavoriteButton>
      )}
      {isTranslating ? (
        <LoaderContainer>
          <BeatLoader color="#001233" size={15} />
        </LoaderContainer>
      ) : translatedArticle ? (
        <>
          {article.title && (
            <Link
              href={article.url}
              style={{ textDecoration: "none" }}
              passHref
            >
              <Title>{article.title}</Title>
            </Link>
          )}
          <DescriptionTranslated>{translatedArticle}</DescriptionTranslated>
          {article.author && (
            <Link
              href={article.url}
              style={{ textDecoration: "none" }}
              passHref
            >
              <Author>
                <StyledStrong>Author:</StyledStrong> {article.author}
              </Author>
            </Link>
          )}
          {article.publishedAt && (
            <Link
              href={article.url}
              style={{ textDecoration: "none" }}
              passHref
            >
              <PublishedAt>
                <StyledStrong>Published At:</StyledStrong>{" "}
                {new Date(article.publishedAt).toLocaleString()}
              </PublishedAt>
            </Link>
          )}
          {article.source.name && (
            <Link
              href={article.url}
              style={{ textDecoration: "none" }}
              passHref
            >
              <PublishedAt>
                <StyledStrong>Source:</StyledStrong> {article.source.name}
              </PublishedAt>
            </Link>
          )}
        </>
      ) : (
        <>
          {article.title && (
            <Link
              href={article.url}
              style={{ textDecoration: "none" }}
              passHref
            >
              <Title>{article.title}</Title>
            </Link>
          )}
          {article.description && (
            <Link
              href={article.url}
              style={{ textDecoration: "none" }}
              passHref
            >
              <Description>{article.description}</Description>
            </Link>
          )}
          {article.author && (
            <Link
              href={article.url}
              style={{ textDecoration: "none" }}
              passHref
            >
              <Author>
                <StyledStrong>Author:</StyledStrong> {article.author}
              </Author>
            </Link>
          )}
          {article.publishedAt && (
            <Link
              href={article.url}
              style={{ textDecoration: "none" }}
              passHref
            >
              <PublishedAt>
                <StyledStrong>Published At:</StyledStrong>{" "}
                {new Date(article.publishedAt).toLocaleString()}
              </PublishedAt>
            </Link>
          )}
          {article.source.name && (
            <Link
              href={article.url}
              style={{ textDecoration: "none" }}
              passHref
            >
              <PublishedAt>
                <StyledStrong>Source:</StyledStrong> {article.source.name}
              </PublishedAt>
            </Link>
          )}
        </>
      )}
      {session && (
        <ButtonContainer>
          <TranslateButton onClick={translate}>
            {isTranslated ? "Show Original" : "AI-powered translation"}
          </TranslateButton>
        </ButtonContainer>
      )}
    </Card>
  );
}
