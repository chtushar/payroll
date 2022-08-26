import useSWR from "swr";
import axios from "axios";
import { Button, Space, Typography, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { API } from "../requests";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useDashboard } from "./DashboardProvider";

const { Title } = Typography;

const Lists = () => {
  const { address } = useAccount();
  const fetcher = async (url: string) => {
    const { data } = await axios.post(url, { owner: address });
    return data;
  };

  const { data, mutate } = useSWR("/api/lists/all", fetcher);

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <Title level={3}>Rolls</Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <AddList onSubmit={mutate} address={address ?? ""} />
        <Divider />
        {data && <ListOfLists data={data} />}
      </Space>
    </Space>
  );
};

const ListOfLists = ({ data }: { data: Array<any> }) => {
  const dashboardContext = useDashboard();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "stretch",
      }}
    >
      {data?.map((list) => {
        return (
          <button
            onClick={() => dashboardContext?.handleSelectList(list)}
            key={list.id}
          >
            {list.name}
          </button>
        );
      })}
    </div>
  );
};

const AddList = ({
  onSubmit,
  address,
}: {
  onSubmit: () => void;
  address: string;
}) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await API.addList({ name, owner: address });
    setName("");
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <input
          placeholder="Create new List"
          type="text"
          name="name"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
        <Button
          type="primary"
          shape="circle"
          disabled={typeof name !== "string" || name.length === 0}
          icon={<PlusOutlined />}
        />
      </div>
    </form>
  );
};

export default Lists;
