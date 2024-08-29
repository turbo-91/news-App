import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import styled from "styled-components";

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    resize: inherit;
  }
`;

function FavoriteButton({
  article,
  userId,
  isFavorite,
  favoriteArticles,
  url,
  handleToggleFavorite,
}) {
  return (
    <Button
      favoriteArticles={favoriteArticles}
      onClick={() => handleToggleFavorite(article.url, userId)}
    >
      {isFavorite ? (
        <BookmarkCheck color="#000" size={35} strokeWidth={1} />
      ) : (
        <Bookmark fill="#000" color="#000" size={35} strokeWidth={1} />
      )}
    </Button>
  );
}

export default FavoriteButton;
