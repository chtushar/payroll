import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { getChains } from "../lib/chains";
import { API } from "../requests";
import { useDashboard } from "./DashboardProvider";

const Addresses = () => {
  const dashboardContext = useDashboard();
  const fetcher = async () => {
    try {
      if (!dashboardContext?.selectedList) {
        return [];
      }
      const data = await axios.get(
        `/api/lists/${dashboardContext?.selectedList?.id}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, mutate } = useSWR(`all_addresses`, fetcher);

  useEffect(() => {
    if (!!dashboardContext?.selectedList) {
      mutate();
    }
  }, [dashboardContext?.selectedList, mutate]);

  return (
    <>
      {dashboardContext?.selectedList && (
        <>
          <h2>{dashboardContext?.selectedList.name}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <AddAddress
              listId={parseInt(dashboardContext?.selectedList.id, 10)}
              onSubmit={mutate}
            />
            <div>
              {Array.isArray(data.data) &&
                data.data.length > 0 &&
                data.data.map((add: any) => {
                  return (
                    <div
                      key={add.id}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {add.address}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

type Event = {
  target: { value: any };
};

const AddAddress = ({
  listId,
  onSubmit,
}: {
  listId?: number;
  onSubmit: any;
}) => {
  const [values, setValues] = useState({
    address: "",
    chain: getChains()[0].id,
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (listId) {
        await API.addAddress(listId, values);
        onSubmit();
      }
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
        <input
          placeholder="Add new address"
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
