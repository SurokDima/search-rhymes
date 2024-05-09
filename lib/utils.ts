import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates an array of arrays, each containing `size` items from the original array.
 * The last array may contain less than `size` items if the original array doesn't have enough items.
 *
 * @param array an original array of items
 * @param size the number of items in each chunk
 * @returns an array of arrays
 *
 * @example
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const result = chunk(array, 3);
 * console.log(result); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *
 * @example
 * const array = [1, 2, 3, 4, 5, 6, 7, 8];
 * const result = chunk(array, 3);
 * console.log(result); // [[1, 2, 3], [4, 5, 6], [7, 8]]
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  return array.reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, [] as T[][]);
};

// TODO add jsdoc
export const splitArray = <T>(array: T[], chunksNumber: number): T[][] => {
  return chunk(array, Math.floor(array.length / chunksNumber));
};

export const isServer = () => typeof window === "undefined";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

/**
 * Selects unique items from an array.
 *
 * @param array an array of items
 * @param criteria comparison callback between two items. If the criteria returns true, the items are considered the same.
 * @returns an array of unique items
 */
export const unique = function <TItem>(
  array: TItem[],
  criteria: (a: TItem, b: TItem) => boolean = (a, b) => a === b
): TItem[] {
  return array.reduce<TItem[]>((acc, item1) => {
    const findTheSameItem = (item2: TItem) => {
      return criteria(item1, item2);
    };

    return acc.find(findTheSameItem) ? acc : [...acc, item1];
  }, []);
};
