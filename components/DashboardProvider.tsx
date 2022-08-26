import { createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";

interface DashboardContextType {
  selectedList?: Record<string, string | number>;
  handleSelectList: (list: Record<string, string | number>) => void;
  allAddresses: Array<{}>;
}
const DashboardContext = createContext<undefined | DashboardContextType>(
  undefined
);

const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [selectedList, setSelectedList] = useState(undefined);
  const allAddresses = useState([]);

  const handleSelectList = (list: any) => {
    setSelectedList(list);
  };

  return (
    <DashboardContext.Provider
      value={{ selectedList, handleSelectList, allAddresses }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType | undefined => {
  const context = useContext(DashboardContext);
  return context;
};

export default DashboardProvider;
