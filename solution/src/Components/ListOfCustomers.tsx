import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
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
      <Box sx={{ padding: 4 }}>
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
                    border: "1px solid rgba(175, 15, 15, 0.18)",
                    color: "#080303",
                    transition: "0.1s",
                    "&:hover": {
                      boxShadow: theme.shadows[2],
                    },
                    background: "rgba(255, 255, 255, 0)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: `0 5px 10px rgba(154, 160, 185, 0.544), 0 16px 40px rgba(234, 236, 247, 0.485)`,
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Badge color="primary" overlap="circular">
                        <Avatar sx={{ backgroundColor: "#4caf50" }}></Avatar>
                      </Badge>
                      <Box>
                        {[
                          { value: name, description: "Name: " },
                          { value: email, description: "Email: " },
                          {
                            value: orders.length,
                            description: "Number of orders: ",
                          },
                          {
                            value: total.toFixed(2),
                            description: "Total amount spent: €",
                          },
                        ].map((item) => (
                          <Chip
                            sx={{
                              background: "rgba(14, 126, 65, 0.37)",
                              justifyContent: "start",
                              width: "100%",
                            }}
                            label={item.description.concat(
                              item.value as string
                            )}
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                    <Button
                      sx={{
                        color: "#080303",
                        "&:hover": {
                          background: "rgba(14, 126, 65, 0.37)",
                          transition: "0.1s",
                        },
                      }}
                      variant="text"
                      onClick={() => {
                        handleOpenOrdersModal(
                          customers.find((item: Customer) => item.id === id)
                        );
                      }}
                    >
                      View Orders
                    </Button>
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
