import React from "react";

function Favorites({ favoriteArticles }) {
  return (
    <div
      favoriteArticles={favoriteArticles}
      handleToggleFavorite={handleToggleFavorite}
    >
      Favorites
    </div>
  );
}

export default Favorites;
