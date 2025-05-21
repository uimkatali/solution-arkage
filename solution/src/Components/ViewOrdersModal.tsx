import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { Customer, Order, SortingTypes } from "../types/customers";
import dayjs from "dayjs";
import { sortByDate } from "../utils/sortByDate";
import { useEffect, useState } from "react";

interface ViewOrdersModalProps {
  open: boolean;
  onClose: () => void;
  selectedCustomer: Customer;
}

const ViewOrdersModal = ({
  open,
  onClose,
  selectedCustomer,
}: ViewOrdersModalProps) => {
  const theme = useTheme();

  const [sortType, setSortType] = useState<SortingTypes>("ascending");
  const [sortedOrders, setSortedOrders] = useState<Order[]>([]);
  const { id, name, orders } = selectedCustomer;

  const handleSorting = () => {
    setSortType((prev) => (prev === "ascending" ? "descending" : "ascending"));
  };

  useEffect(() => {
    setSortedOrders(sortByDate(orders, sortType));
  }, [sortType, orders]);

  console.log(sortedOrders);
  return (
    <Dialog key={id} open={open} onClose={onClose}>
      <DialogTitle>{name}</DialogTitle>

      <DialogContent>
        <Typography>Orders</Typography>
        {sortedOrders.length > 0 ? (
          sortedOrders.map(({ id, date, total }) => (
            <DialogContentText>
              <Typography>Order ID: ${id}</Typography>
              <Typography>Amount: ${total}</Typography>
              <Typography>Date: ${dayjs(date).format("DD/MM/YYYY")}</Typography>
            </DialogContentText>
          ))
        ) : (
          <DialogContentText>
            <Typography>There are no orders</Typography>
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSorting()}>{sortType}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewOrdersModal;
