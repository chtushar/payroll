import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Stack from "rsuite/Stack";
import Input from "rsuite/Input";
import InputGroup from "rsuite/InputGroup";
import Button from "rsuite/Button";
import IconButton from "rsuite/IconButton";
import Trash from "@rsuite/icons/Trash";
import SelectPicker from "rsuite/SelectPicker";
import Panel from "rsuite/Panel";
import { getChains } from "../lib/chains";
import { API } from "../requests";
import { useDashboard } from "./DashboardProvider";
import { useContract, useSigner, useNetwork } from "wagmi";
import { toast } from "react-toastify";
import contractABI from "../abis/BulkMultiChain.json";
import { BigNumber } from "ethers";

const chains = getChains();

const chainMappings = {
  250: 4,
  137: 1,
};

const processDataForContract = (
  data: Array<{ address: string; chain_id: 137 | 250; amount: number }>
): Array<{ _to: string; _chainID: number; _amt: BigNumber }> => {
  return data.map(({ address, chain_id, amount }) => ({
    _to: address,
    _chainID: chainMappings[chain_id],
    _amt: BigNumber.from((amount * 10 ** 18).toString()),
  }));
};

const Addresses = () => {
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

  const dashboardContext = useDashboard();
  const { chain } = useNetwork();
  const { data, mutate } = useSWR(`all_addresses`, fetcher);
  const { data: signer, isError, isLoading } = useSigner();

  const contract = useContract({
    addressOrName: "0x281ACae8cdb67F492040A0ac0Fa19cDEa14cd20A",
    contractInterface: contractABI.abi,
    signerOrProvider: signer,
  });

  const handleRemove = async (listId: number) => {
    await API.removeAddress(listId);
    mutate();
  };

  useEffect(() => {
    if (!!dashboardContext?.selectedList) {
      mutate();
    }
  }, [dashboardContext?.selectedList, mutate]);

  return (
    <>
      {dashboardContext?.selectedList && (
        <Stack direction="column" spacing={48} alignItems="stretch">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            <h2>{dashboardContext?.selectedList.name}</h2>
            <Button
              appearance="primary"
              size="lg"
              onClick={async () => {
                console.log(data);
                if (data.data && contract) {
                  try {
                    // await contract.setCrossChainGas(
                    //   (data.data.length ?? 1) * 5000000000
                    // );
                    await contract.bulkTransferCrossChain(
                      processDataForContract(data.data)
                    );
                  } catch (error) {
                    console.log(error);
                    toast("Something went wrong", { type: "error" });
                  }
                }
              }}
            >
              Pay
            </Button>
          </Stack>
          <Stack direction="column" alignItems="stretch" spacing={18}>
            <AddAddress
              listId={parseInt(dashboardContext?.selectedList.id, 10)}
              onSubmit={mutate}
            />
            <Stack direction="column" alignItems="stretch" spacing={12}>
              {Array.isArray(data?.data) &&
                data?.data.length > 0 &&
                data?.data.map((add: any) => {
                  return (
                    <Panel
                      key={add.id}
                      style={{ display: "flex", flexDirection: "row" }}
                      bordered
                    >
                      <Stack
                        direction="row"
                        spacing={16}
                        justifyContent="space-between"
                        style={{ width: "100%" }}
                      >
                        <Stack direction="row" spacing={16} style={{ flex: 1 }}>
                          <span>{add.address}</span>
                          <span>
                            {chains.find(({ id }) => id === add.chain_id)?.name}
                          </span>
                          <span>{add.amount}</span>
                        </Stack>
                        <IconButton
                          icon={<Trash />}
                          color="red"
                          appearance="primary"
                          size="sm"
                          onClick={() => handleRemove(add.id)}
                        />
                      </Stack>
                    </Panel>
                  );
                })}
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
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
    chain: chains[0].id,
    amount: 0,
  });

  const handleAddressChange = (value: string) => {
    setValues((prev) => ({
      ...prev,
      address: value,
    }));
  };

  const handleChainChange = (value: string | null) => {
    if (typeof value === "string") {
      setValues((prev) => ({
        ...prev,
        chain: parseInt(value, 10),
      }));
    }
  };

  const handleAmountChange = (value: string) => {
    setValues((prev) => ({
      ...prev,
      amount: parseFloat(value),
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

  const isValid =
    typeof values.address === "string" &&
    values?.address.length > 0 &&
    typeof values.chain === "number" &&
    typeof values.amount === "number" &&
    values.amount > 0;

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={12} alignItems="center">
        <Input
          placeholder="Add new address"
          type="text"
          name="name"
          value={values.address}
          onChange={handleAddressChange}
        />
        <SelectPicker
          name="chain"
          id="chain"
          onChange={handleChainChange}
          style={{ minWidth: 150 }}
          data={chains.map(({ name, id }) => ({
            label: name,
            value: id.toString(),
          }))}
        />
        <InputGroup>
          <InputGroup.Addon>PYRLR</InputGroup.Addon>
          <Input
            type="number"
            name="amount"
            id="amount"
            value={values.amount}
            onChange={handleAmountChange}
          />
        </InputGroup>
        <Button type="submit" appearance="subtle" disabled={!isValid}>
          Add address
        </Button>
      </Stack>
    </form>
  );
};

export default Addresses;
