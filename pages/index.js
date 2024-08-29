import Spotlight from "@/features/Spotlight/Spotlight";

export default function HomePage({ favoriteArticles, handleToggleFavorite }) {
  return (
    <Spotlight
      favoriteArticles={favoriteArticles}
      handleToggleFavorite={handleToggleFavorite}
    />
  );
}
