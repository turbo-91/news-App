import Layout from "@/layout/Layout";
import GlobalStyle from "../styles";
import { SessionProvider } from "next-auth/react";
import useLocalStorageState from "use-local-storage-state";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [favoriteState, setFavoriteState] = useLocalStorageState(
    "favoriteState",
    {
      defaultValue: [],
    }
  );

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Layout>
          <Component
            {...pageProps}
            favoriteState={favoriteState}
            setFavoriteState={setFavoriteState}
          />
        </Layout>
      </SessionProvider>
    </>
  );
}
