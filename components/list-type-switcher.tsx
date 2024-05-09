import { IconColumns, IconMist } from "@tabler/icons-react";
import { FC } from "react";

import { FloatingIndicator } from "@/components/ui/floating-indicator";

export const ListTypeSwitcher: FC<{ onChange: (type: "vertical" | "horizontal") => void }> = ({
  onChange,
}) => {
  const items = [
    {
      label: <IconMist key="mist" />,
      action: () => onChange("horizontal"),
    },
    {
      label: <IconColumns key="columns" />,
      action: () => onChange("vertical"),
    },
  ];

  return <FloatingIndicator items={items} />;
};
