import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import Layout from "../components/Layout";

const Dashboard: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);

  return <Layout>test</Layout>;
};

export default Dashboard;
