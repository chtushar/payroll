import React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Stack from "rsuite/Stack";
import { GithubOutlined } from "@ant-design/icons";
import { useAccount } from "wagmi";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const router = useRouter();
  useAccount({
    onConnect({ address, connector, isReconnected }) {
      router.push("/dashboard");
    },
  });

  return (
    <Layout>
      <Stack direction="column" alignItems="flex-start">
        <Stack direction="column" alignItems="flex-start">
          <h2>Bulk cross-chain transactions, made easy.</h2>
          <h2 style={{ color: "salmon" }}>Payroll router</h2>
        </Stack>
        <Stack spacing={16} style={{ fontSize: 16 }}>
          <Link href="https://github.com/chtushar/payroll">
            <a>Github</a>
          </Link>
          <Link href="https://devfolio.co/@tu">
            <a>Devfolio</a>
          </Link>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Home;
