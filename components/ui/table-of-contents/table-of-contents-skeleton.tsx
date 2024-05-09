import { Box, Group, Skeleton, Text, rem } from "@mantine/core";
import { IconListSearch } from "@tabler/icons-react";
import { FC } from "react";

import { cn } from "@/lib/utils";

import classes from "./table-of-contents.module.css";

export const TableOfContentsSkeleton: FC = () => {
  return (
    <div className={classes.root}>
      <Group mb="md">
        <IconListSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        <Text>Table of contents</Text>
      </Group>
      <div className={classes.links}>
        <div
          className={classes.indicator}
          style={{
            transform: `translateY(calc(${0} * var(--link-height) + var(--indicator-offset)))`,
          }}
        />
        <Box
          key="skeleton-1"
          className={cn(classes.link, { [classes.linkActive]: true })}
          style={{ paddingLeft: `calc(${1} * var(--mantine-spacing-md))` }}
        >
          <Skeleton className={classes.skeleton} />
        </Box>
        <Box
          key="skeleton-2"
          className={cn(classes.link, classes.short, { [classes.linkActive]: false })}
          style={{ paddingLeft: `calc(${2} * var(--mantine-spacing-md))` }}
        >
          <Skeleton className={classes.skeleton} />
        </Box>

        <Box
          key="skeleton-3"
          className={cn(classes.link, classes.short, { [classes.linkActive]: true })}
          style={{ paddingLeft: `calc(${2} * var(--mantine-spacing-md))` }}
        >
          <Skeleton className={classes.skeleton} />
        </Box>
        <Box
          key="skeleton-4"
          className={cn(classes.link, { [classes.linkActive]: true })}
          style={{ paddingLeft: `calc(${1} * var(--mantine-spacing-md))` }}
        >
          <Skeleton className={classes.skeleton} />
        </Box>
        <Box
          key="skeleton-5"
          className={cn(classes.link, { [classes.linkActive]: true })}
          style={{ paddingLeft: `calc(${1} * var(--mantine-spacing-md))` }}
        >
          <Skeleton className={classes.skeleton} />
        </Box>
      </div>
    </div>
  );
};
