import Spotlight from "@/features/Spotlight/Spotlight";

export default function HomePage({ favoriteState, setFavoriteState }) {
  return (
    <Spotlight
      setFavoriteState={setFavoriteState}
      favoriteState={favoriteState}
    />
  );
}
