import Layout from "@/layout/Layout";
import GlobalStyle from "../styles";
import { SessionProvider } from "next-auth/react";
import useLocalStorageState from "use-local-storage-state";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // Favorite Functionality
  const [favoriteArticles, setFavoriteArticles] = useLocalStorageState(
    "favorite articles",
    {
      defaultValue: [],
    }
  );

  function toggleFavorite(favoriteArticles, url, userId) {
    // See if article is already in the state array
    const info = favoriteArticles.find(
      (article) => article.url === url && article.userId === userId
    );

    if (info) {
      // If the article is already in the array, toggle the isFavorite value
      return favoriteArticles.map((article) =>
        article.url === url && article.userId === userId
          ? { ...article, isFavorite: !article.isFavorite }
          : article
      );
    } else {
      // If the article is not in the array already, add it with the favorite as true
      return [...favoriteArticles, { url, userId, isFavorite: true }];
    }
  }

  function handleToggleFavorite(url, userId) {
    const updatedArticles = toggleFavorite(favoriteArticles, url, userId);
    setFavoriteArticles(updatedArticles);
  }

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Layout>
          <Component
            {...pageProps}
            favoriteArticles={favoriteArticles}
            handleToggleFavorite={handleToggleFavorite}
          />
        </Layout>
      </SessionProvider>
    </>
  );
}
