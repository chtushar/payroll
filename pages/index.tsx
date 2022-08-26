import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const router = useRouter();
  useAccount({
    onConnect({ address, connector, isReconnected }) {
      router.push("/dashboard");
    },
  });

  return <Layout>test</Layout>;
};

export default Home;
