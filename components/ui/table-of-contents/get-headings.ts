export type Heading = {
  depth: number;
  content: string;
  id: string;
  getNode: () => HTMLHeadingElement;
};

function getHeadingsData(headings: HTMLHeadingElement[]): Heading[] {
  return headings
    .filter((heading) => !!heading.id)
    .map((heading) => ({
      depth: parseInt(heading.getAttribute("data-order")!, 10),
      content: heading.getAttribute("data-heading") || "",
      id: heading.id,
      getNode: () => document.getElementById(heading.id) as HTMLHeadingElement,
    }));
}

export function getHeadings(): Heading[] {
  return getHeadingsData(Array.from(document.querySelectorAll("[data-heading]")));
}
