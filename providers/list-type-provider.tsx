"use client";

import { FC, createContext, useContext, useMemo, useState } from "react";

import { noop } from "@/lib/utils";

export type ListType = "horizontal" | "vertical";

export type ListTypeContextType = {
  type: ListType;
  setListType: (type: "horizontal" | "vertical") => void;
};

const ListTypeContext = createContext<ListTypeContextType>({
  type: "horizontal",
  setListType: noop,
});

export const ListTypeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listType, setListType] = useState<ListType>("horizontal");
  const contextValue = useMemo(() => ({ type: listType, setListType }), [listType, setListType]);
  return <ListTypeContext.Provider value={contextValue}>{children}</ListTypeContext.Provider>;
};

export const useListType = () => {
  return useContext(ListTypeContext);
};
