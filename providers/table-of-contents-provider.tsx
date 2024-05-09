"use client";
import { nanoid } from "nanoid";
import { FC, createContext, useCallback, useContext, useMemo, useState } from "react";

import { noop } from "@/lib/utils";

export type TableOfContentsContextType = {
  key: string;
  updateTableOfContents: () => void;
};

const TableOfContentsContext = createContext<TableOfContentsContextType>({
  key: "",
  updateTableOfContents: noop,
});

export const TableOfContentsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [key, setKey] = useState("");

  const updateTableOfContents = useCallback(() => {
    const id = nanoid();
    console.log("setting key", id);
    setKey(id);
  }, []);

  const contextValue = useMemo(
    () => ({ key, updateTableOfContents }),
    [key, updateTableOfContents]
  );

  console.log("key", key);

  return (
    <TableOfContentsContext.Provider value={contextValue}>
      {children}
    </TableOfContentsContext.Provider>
  );
};

export const useTableOfContents = () => {
  return useContext(TableOfContentsContext);
};
