import styled from "styled-components";
import Image from "next/legacy/image";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import newsAppThumbnail from "/assets/news-app-thumbnail.png";

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

const FavoriteButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const StyledStrong = styled.strong`
  color: #001233;
`;

export default function ArticleCard({
  article,
  favoriteArticles,
  handleToggleFavorite,
}) {
  // bypass next/Image components domain restriction! Caution! Security concern.
  const customLoader = ({ src }) => {
    return src;
  };
  console.log(article);

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
