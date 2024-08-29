import React from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import styled from "styled-components";

const Paragraph = styled.p`
  color: #001233;
  margin: 10vh 0;
  text-align: center;
  font-size: 1em;
  font-family: Helvetica, Arial, sans-serif;
`;

function FavoritesList({ favoriteState, setFavoriteState }) {
  const favoriteArticles = favoriteState.filter(
    (article) => article.isFavorite
  );
  return (
    <div>
      {favoriteArticles.length === 0 ? (
        <Paragraph>No favorite articles yet.</Paragraph>
      ) : (
        favoriteArticles.map((article, index) => (
          <ArticleCard
            key={index}
            article={article}
            favoriteState={favoriteState}
            setFavoriteState={setFavoriteState}
          />
        ))
      )}
    </div>
  );
}

export default FavoritesList;
