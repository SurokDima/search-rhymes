"use client";

import { FC } from "react";

import { ListTypeSwitcher } from "@/components/list-type-switcher";
import { useListType } from "@/providers/list-type-provider";

export const WithListTypeSwitcher: FC = () => {
  const { setListType } = useListType();
  return <ListTypeSwitcher onChange={setListType} />;
};
