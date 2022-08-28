import * as React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import Stack from "rsuite/Stack";
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
      <div style={{ flex: 1, height: "100%", alignSelf: "stretch" }}>
        <DashboardProvider>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              columnGap: 24,
            }}
          >
            <Stack
              direction="column"
              spacing={24}
              style={{ gridColumn: "1 / 2" }}
            >
              <Lists />
            </Stack>
            <Stack
              direction="column"
              alignItems="flex-start"
              spacing={24}
              style={{ gridColumn: "2 / -1" }}
            >
              <Addresses />
            </Stack>
          </div>
        </DashboardProvider>
      </div>
    </Layout>
  );
};

export default Dashboard;
