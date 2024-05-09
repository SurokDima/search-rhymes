"use client";

import { FC, createContext, useCallback, useContext, useMemo, useState } from "react";

import { noop } from "@/lib/utils";

type ActionToolbarRenderer = () => React.ReactNode;

export type ActionToolbarContextValue = {
  register: (renderer: ActionToolbarRenderer) => void;
  unregister: () => void;
  renderer: ActionToolbarRenderer | null;
};

export type ActionToolbarContextProps = {
  actionToolbar: ActionToolbarContextValue;
};

export const ActionToolbarContext = createContext<ActionToolbarContextValue>({
  register: noop,
  unregister: noop,
  renderer: null,
});

// TODO maybe improve interface
export const ActionToolbarProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [renderer, setRenderer] = useState<ActionToolbarRenderer | null>(null);

  const register = useCallback((renderer: ActionToolbarRenderer) => {
    setRenderer(() => renderer);
  }, []);

  const unregister = useCallback(() => {
    setRenderer(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      register,
      unregister,
      renderer,
    }),
    [register, renderer, unregister]
  );

  return (
    <ActionToolbarContext.Provider value={contextValue}>{children}</ActionToolbarContext.Provider>
  );
};

export const useActionToolbar = () => {
  return useContext(ActionToolbarContext);
};

export const ActionToolbar: FC = () => {
  const { renderer } = useActionToolbar();

  return <>{renderer?.()}</>;
};
