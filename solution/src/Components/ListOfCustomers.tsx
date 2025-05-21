import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import customers from "../mockdata/customerData.json";
import { useState } from "react";
import ViewOrdersModal from "./ViewOrdersModal";
import type { Customer } from "../types/customers";
const ListOfCustomers = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleOpenOrdersModal = (customer: Customer | undefined) => {
    if (customer) {
      setSelectedCustomer(customer);
      setOpen(true);
    }
  };

  const handleCloseOrdersModal = () => {
    setSelectedCustomer(null);
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#f5f5f5", padding: 4, minHeight: "100vh" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Customer Dashboard
        </Typography>

        <Grid container spacing={3}>
          {customers.map(({ id, name, email, orders }) => {
            const total = orders.reduce((sum, order) => sum + order.total, 0);

            return (
              <Grid key={id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    padding: 2,
                    background: "rgba(255, 255, 255, 0.144)",
                    boxShadow: "0 4px 16px 0 rgba(27, 139, 77, 0.37)",
                    backdropFilter: "blur(120px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(175, 15, 15, 0.18)",
                    color: "#080303",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: theme.shadows[2],
                    },
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Badge color="primary" overlap="circular">
                        <Avatar sx={{ backgroundColor: "#4caf50" }}></Avatar>
                      </Badge>
                      <Box>
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="body2">{`Email: ${email}`}</Typography>
                        <Typography variant="body2">
                          {`Number of orders: ${orders.length}`}
                        </Typography>
                        <Typography>{`Total amount spent: €${total.toFixed(
                          2
                        )}`}</Typography>
                      </Box>
                    </Box>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        handleOpenOrdersModal(
                          customers.find((item: Customer) => item.id === id)
                        );
                      }}
                    >
                      View Orders
                    </Link>
                    {selectedCustomer && (
                      <ViewOrdersModal
                        open={open}
                        onClose={() => handleCloseOrdersModal()}
                        selectedCustomer={selectedCustomer}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default ListOfCustomers;
