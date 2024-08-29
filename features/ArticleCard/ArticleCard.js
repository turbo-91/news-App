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

export default function ArticleCard({
  article,
  favoriteState,
  setFavoriteState,
  // favoriteArticles,
  // handleToggleFavorite,
}) {
  // bypass next/Image components domain restriction! Caution! Security concern.
  const customLoader = ({ src }) => {
    return src;
  };
  console.log("favoriteState in ArticleCard", favoriteState);
  // make session available for favorite button
  const { data: session } = useSession();
  const userId = session?.user?.userId;

  // Favorite Functionality

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
    console.log("favoriteState in toggleFavorite", favoriteState);
    console.log("article in toggleFavorite", article);
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
    console.log("favoriteArticle in toggleFavorite", favoriteArticle);
    const existingFavorite = favoriteState.find(
      (faveArticle) =>
        faveArticle.url === favoriteArticle.url && faveArticle.userId === userId
    );
    console.log("existingFavorite in toggleFavorite", existingFavorite);

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
  const toggleFavoriteProduziertObjekte = toggleFavorite(article);
  console.log(
    "toggleFavoriteProduziertObjekte",
    toggleFavoriteProduziertObjekte
  );

  function handleToggleFavorite(article) {
    const updatedArticles = toggleFavorite(article);
    setFavoriteState(updatedArticles);
  }

  function isFavorite(favoriteState, article) {
    return favoriteState.find((faveArticle) => faveArticle.url === article.url)
      ?.isFavorite;
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
      {article.title && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Title>{article.title}</Title>
        </a>
      )}
      {article.description && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Description>{article.description}</Description>
        </a>
      )}
      {article.author && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Author>
            <StyledStrong>Author:</StyledStrong> {article.author}
          </Author>
        </a>
      )}
      {article.publishedAt && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <PublishedAt>
            <StyledStrong>Published At:</StyledStrong>{" "}
            {new Date(article.publishedAt).toLocaleString()}
          </PublishedAt>
        </a>
      )}
      {article.source.name && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <PublishedAt>
            <StyledStrong>Source:</StyledStrong> {article.source.name}
          </PublishedAt>
        </a>
      )}
    </Card>
  );
}
