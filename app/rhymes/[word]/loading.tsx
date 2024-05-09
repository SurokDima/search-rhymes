import { AppShellAside, Group, Loader } from "@mantine/core";

import { TableOfContentsSkeleton } from "@/components/ui/table-of-contents/table-of-contents-skeleton";

export default function Loading() {
  return (
    <>
      <Group justify="center">
        <Loader />
      </Group>
      <AppShellAside p="md" w={250} visibleFrom="md">
        <TableOfContentsSkeleton />
      </AppShellAside>
    </>
  );
}
