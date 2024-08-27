import React from "react";
import Head from "next/head";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>NEWS APP</title>
      </Head>
      <Header />
      <main>{children}</main>
      <NavBar />
    </div>
  );
};

export default Layout;
