export interface Customer {
  id: number;
  name: string;
  email: string;
  orders: Order[];
}

export interface Order {
  id: number;
  total: number;
  date: string;
}
