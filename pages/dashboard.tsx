import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import DashboardProvider from "../components/DashboardProvider";

import Layout from "../components/Layout";
import Lists from "../components/Lists";
import Addresses from "../components/Addresses";

const Dashboard: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);

  return (
    <Layout>
      <DashboardProvider>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: 24,
          }}
        >
          <div style={{ gridColumn: "1 / 2" }}>
            <Lists />
          </div>
          <div style={{ gridColumn: "2 / -1" }}>
            <Addresses />
          </div>
        </div>
      </DashboardProvider>
    </Layout>
  );
};

export default Dashboard;
