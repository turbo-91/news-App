import Layout from "@/layout/Layout";
import GlobalStyle from "../styles";
import { SessionProvider } from "next-auth/react";
import useLocalStorageState from "use-local-storage-state";
import toggleFavorite from "@/utils/handleToggleFavorite";

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
