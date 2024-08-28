import Spotlight from "@/features/Spotlight/Spotlight";

export default function HomePage({ favoriteArticles }) {
  return <Spotlight favoriteArticles={favoriteArticles} />;
}
