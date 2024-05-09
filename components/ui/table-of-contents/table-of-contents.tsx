"use client";

import { Box, Group, rem, Text } from "@mantine/core";
import { IconListSearch } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useTableOfContents } from "@/providers/table-of-contents-provider";

import { getHeadings, Heading } from "./get-headings";
import { TableOfContentsSkeleton } from "./table-of-contents-skeleton";
import classes from "./table-of-contents.module.css";

function getActiveElement(rects: DOMRect[]) {
  if (rects.length === 0) {
    return -1;
  }

  const closest = rects.reduce(
    (acc, item, index) => {
      if (Math.abs(acc.position) < Math.abs(item.y)) {
        return acc;
      }

      return {
        index,
        position: item.y,
      };
    },
    { index: 0, position: rects[0].y }
  );

  return closest.index;
}

export function TableOfContents() {
  const [active, setActive] = useState(0);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const headingsRef = useRef<Heading[]>([]);
  const { key } = useTableOfContents();
  const pathname = usePathname();

  const filteredHeadings = headings.filter((heading) => heading.depth > 1);

  console.log("filteredHeadings", filteredHeadings);
  const handleScroll = () => {
    setActive(
      getActiveElement(
        headingsRef.current
          .filter((heading) => heading.depth > 1)
          .map((d) => d.getNode()?.getBoundingClientRect())
          .filter((item) => !!item)
      )
    );
  };

  useEffect(() => {
    const _headings = getHeadings();
    headingsRef.current = _headings;
    setHeadings(_headings);
    setActive(
      getActiveElement(
        _headings
          .filter((heading) => heading.depth > 1)
          .map((d) => d.getNode()?.getBoundingClientRect())
          .filter((item) => !!item)
      )
    );
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [key]);

  if (filteredHeadings.length === 0) {
    return null;
  }
  

  const items = filteredHeadings.map((heading, index) => (
    <Box
      component="a"
      onClick={(e) => {
        e.preventDefault();
        setActive(index);
        window.history.replaceState(null, "", `${pathname}#${heading.id}`);
        heading.getNode()?.scrollIntoView();
      }}
      key={heading.id}
      className={cn(classes.link, { [classes.linkActive]: active === index })}
      style={{ paddingLeft: `calc(${heading.depth} * var(--mantine-spacing-md))` }}
    >
      {heading.content}
    </Box>
  ));

  return filteredHeadings.length === 0 ? (
    <TableOfContentsSkeleton />
  ) : (
    <div className={classes.root}>
      <Group mb="md">
        <IconListSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        <Text>Table of contents</Text>
      </Group>
      <div className={classes.links}>
        <div
          className={classes.indicator}
          style={{
            transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))`,
          }}
        />
        {items}
      </div>
    </div>
  );
}
