"use client";

import { UnstyledButton, FloatingIndicator as RawFloatingIndicator } from "@mantine/core";
import { FC, useState } from "react";

import styles from "./floating-indicator.module.scss";

type IndicatorItem = {
  label: React.ReactNode;
  action: () => void;
};

export type FloatingIndicatorProps = {
  items: IndicatorItem[];
};

export const FloatingIndicator: FC<FloatingIndicatorProps> = ({ items }) => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = items.map((item, index) => (
    <UnstyledButton
      key={index}
      className={styles.control}
      ref={setControlRef(index)}
      onClick={() => {
        setActive(index);
        item.action();
      }}
      mod={{ active: active === index }}
    >
      <span className={styles.controlLabel}>{item.label}</span>
    </UnstyledButton>
  ));

  return (
    <div className={styles.root} ref={setRootRef}>
      {controls}

      <RawFloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={styles.indicator}
      />
    </div>
  );
};
