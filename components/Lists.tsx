import useSWR from "swr";
import axios from "axios";
import Stack from "rsuite/Stack";
import Input from "rsuite/Input";
import IconButton from "rsuite/IconButton";
import Button from "rsuite/Button";
import PlusIcon from "@rsuite/icons/legacy/Plus";
import { API } from "../requests";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useDashboard } from "./DashboardProvider";

const Lists = () => {
  const { address } = useAccount();
  const fetcher = async (url: string) => {
    const { data } = await axios.post(url, { owner: address });
    return data;
  };

  const { data, mutate } = useSWR("/api/lists/all", fetcher);

  return (
    <div style={{ padding: 24, borderRadius: 16, backgroundColor: "#fafafa" }}>
      <Stack direction="column" alignItems="stretch" spacing={24}>
        <h3>Rolls</h3>
        <Stack
          direction="column"
          spacing={12}
          alignItems="stretch"
          style={{ width: "100%" }}
        >
          <AddList onSubmit={mutate} address={address ?? ""} />
          {data && <ListOfLists data={data} />}
        </Stack>
      </Stack>
    </div>
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
          <Button
            size="lg"
            onClick={() => dashboardContext?.handleSelectList(list)}
            key={list.id}
          >
            {list.name}
          </Button>
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
    try {
      await API.addList({ name, owner: address });
      setName("");
      onSubmit?.();
    } catch (error) {
      console.log(error);
    }
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
        <Input
          placeholder="Create new List"
          type="text"
          name="name"
          value={name}
          onChange={(value) => setName(value)}
        />
        <IconButton
          type="submit"
          size="md"
          icon={<PlusIcon />}
          disabled={typeof name !== "string" || name.length === 0}
          appearance="primary"
        />
      </div>
    </form>
  );
};

export default Lists;
