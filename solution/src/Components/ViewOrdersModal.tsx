import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import type { Customer, Order, SortingTypes } from "../types/customers";
import dayjs from "dayjs";
import { sortByDate } from "../utils/sortByDate";
import { useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

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
  const [sortType, setSortType] = useState<SortingTypes>("ascending");
  const [sortedOrders, setSortedOrders] = useState<Order[]>([]);
  const { id, name, orders } = selectedCustomer;

  const handleSorting = () => {
    setSortType((prev) => (prev === "ascending" ? "descending" : "ascending"));
  };

  useEffect(() => {
    setSortedOrders(sortByDate(orders, sortType));
  }, [sortType, orders]);

  const getAverageOrderValue = (orders: Order[]): number => {
    if (orders.length === 0) {
      return 0;
    }
    const averageTotal =
      orders.reduce((acc, value) => acc + (value.total ?? 0), 0) /
      orders.length;
    return averageTotal;
  };

  return (
    <Dialog key={id} open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
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
        <Typography sx={{ paddingTop: "2px" }}>
          Average order value: ${getAverageOrderValue(sortedOrders).toFixed(2)}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{
            color: "#080303",
            "&:hover": {
              background: "rgba(27, 139, 77, 0.37)",
            },
          }}
          onClick={() => handleSorting()}
          startIcon={
            sortType === "ascending" ? <ArrowUpward /> : <ArrowDownward />
          }
        >
          {sortType}
        </Button>
        <Button
          sx={{
            color: "#080303",
            "&:hover": {
              background: "rgba(27, 139, 77, 0.37)",
            },
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewOrdersModal;
