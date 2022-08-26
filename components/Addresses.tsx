import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { getChains } from "../lib/chains";
import { useDashboard } from "./DashboardProvider";

const Addresses = () => {
  const dashboardContext = useDashboard();
  const fetcher = async () => {
    if (!dashboardContext?.selectedList) {
      return [];
    }

    return await axios.get(`/api/lists/${dashboardContext?.selectedList?.id}`);
  };

  const { data, mutate } = useSWR(`all_addresses`, fetcher);

  useEffect(() => {
    if (!!dashboardContext?.selectedList) {
      mutate();
    }
  }, [dashboardContext?.selectedList, mutate]);

  return (
    <>
      <AddAddress />
      {dashboardContext?.selectedList &&
        Array.isArray(data) &&
        data.length > 0 &&
        JSON.stringify(data)}
    </>
  );
};

type Event = {
  target: { value: any };
};

const AddAddress = () => {
  const [values, setValues] = useState({
    address: "",
    chain: undefined,
    amount: 0,
  });

  const handleAddressChange = ({ target: { value } }: Event) => {
    setValues((prev) => ({
      ...prev,
      address: value,
    }));
  };

  const handleChainChange = ({ target: { value } }: Event) => {
    setValues((prev) => ({
      ...prev,
      chain: value,
    }));
  };

  const handleAmountChange = ({ target: { value } }: Event) => {
    setValues((prev) => ({
      ...prev,
      amount: value,
    }));
  };

  return (
    <form>
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
          value={values.address}
          onChange={handleAddressChange}
        />
        <select
          name="chain"
          id="chain"
          value={values.chain}
          onChange={handleChainChange}
        >
          {getChains().map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          id="amount"
          value={values.amount}
          onChange={handleAmountChange}
        />
        <button>Add address</button>
      </div>
    </form>
  );
};

export default Addresses;
