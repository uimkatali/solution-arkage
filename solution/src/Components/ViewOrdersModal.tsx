import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
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
        <Typography variant="h6" gutterBottom>
          Orders
        </Typography>
        {sortedOrders.length > 0 ? (
          <List>
            {sortedOrders.map(({ id, date, total }) => (
              <div key={id}>
                <ListItem>
                  <ListItemText
                    primary={`Order ID: ${id}`}
                    secondary={`Amount: €${total} | Date: ${dayjs(date).format(
                      "DD/MM/YYYY"
                    )}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        ) : (
          <DialogContentText>
            <Typography>No orders found.</Typography>
          </DialogContentText>
        )}
        <Typography variant="h6" sx={{ paddingTop: "10px" }}>
          Average order value: €{getAverageOrderValue(sortedOrders).toFixed(2)}
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
          {`Sort by date (${sortType})`}
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
