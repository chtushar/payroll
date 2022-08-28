import * as React from "react";
import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import styles from "../styles/Layout.module.css";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className={styles.layout}>
      <Head>
        <meta charSet="UTF-8" />
        <title>Payroll | Unfold 2022 submission</title>
        <meta
          name="description"
          content="This project is a submission to Unfold 2022 hackathon hosted by Devfolio and CoinDCX"
        />
      </Head>
      <header className={styles.header}>
        <ConnectButton />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
