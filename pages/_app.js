import Layout from "@/layout/Layout";
import GlobalStyle from "../styles";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // Favorite Functionality
  const [articles, setArticles] = useLocalStorageState("articles", {
    defaultValue: [],
  });

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
