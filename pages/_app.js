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

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} favoriteArticles={favoriteArticles} />
        </Layout>
      </SessionProvider>
    </>
  );
}
