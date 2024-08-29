import React from "react";
import ArticleCard from "../ArticleCard/ArticleCard";

function FavoritesList({ favoriteArticles, handleToggleFavorite }) {
  return (
    <div>
      {favoriteArticles.length === 0 ? (
        <p>No favorite articles yet.</p>
      ) : (
        favoriteArticles.map((article, index) => (
          <ArticleCard
            key={index}
            article={article}
            favoriteArticles={favoriteArticles}
            handleToggleFavorite={handleToggleFavorite}
          />
        ))
      )}
    </div>
  );
}

export default FavoritesList;
