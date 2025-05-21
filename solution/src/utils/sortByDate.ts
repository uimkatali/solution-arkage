import dayjs from "dayjs";
import type { Order, SortingTypes } from "../types/customers";

export const sortByDate = (
  orders: Order[],
  sortType: SortingTypes
): Order[] => {
  return [...orders].sort((a, b) => {
    const dateA = dayjs(a.date);
    const dateB = dayjs(b.date);

    return sortType === "ascending"
      ? dateA.valueOf() - dateB.valueOf()
      : dateB.valueOf() - dateA.valueOf();
  });
};
