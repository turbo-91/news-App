import FavoritesList from "@/features/FavoritesList/FavoritesList";
import React from "react";

function Favorites({ favoriteArticles, handleToggleFavorite }) {
  return (
    <div>
      <FavoritesList
        favoriteArticles={favoriteArticles}
        handleToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

export default Favorites;
