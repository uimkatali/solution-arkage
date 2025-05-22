export interface Customer {
  id: number;
  name: string;
  email: string;
  orders: Order[];
}

export interface Order {
  id: number;
  total: number | undefined;
  date: string;
}

export type SortingTypes = "ascending" | "descending";

export type SearchFilter = "name" | "email";
