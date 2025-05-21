import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
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
    <Dialog
      sx={{
        borderRadius: 3,
        padding: 2,
        alignContent: "center",
        color: "#080303",
        transition: "0.1s",
        minWidth: "316px",
        background: "rgba(255, 255, 255, 0)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: `
    0 5px 10px rgba(154, 160, 185, 0.544),
    0 16px 40px rgba(234, 236, 247, 0.485)
  `,
      }}
      key={id}
      open={open}
      onClose={onClose}
      maxWidth={"xs"}
      fullWidth
    >
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
      <DialogActions>
        <Button
          sx={{
            color: "#080303",
            "&:hover": {
              background: "rgba(27, 139, 77, 0.37)",
            },
          }}
          onClick={() => handleSorting()}
        >
          {sortType}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewOrdersModal;
