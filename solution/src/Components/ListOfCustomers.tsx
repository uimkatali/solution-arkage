import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import customers from "../mockdata/customerData.json";
import { useEffect, useState, type KeyboardEventHandler } from "react";
import ViewOrdersModal from "./ViewOrdersModal";
import type { Customer, SearchFilter } from "../types/customers";
import {
  Check,
  FilterAlt,
  IcecreamRounded,
  IncompleteCircleOutlined,
  MonetizationOn,
} from "@mui/icons-material";
import SearchbarWithFilter from "./SearchbarWithFilter";
const ListOfCustomers = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedFilter, setSelectedFilter] = useState<SearchFilter>("name");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredCustomers, setFilteredCustomers] =
    useState<Customer[]>(customers);
  const [sortedCustomers, setSortedCustomers] = useState<Customer[]>(customers);
  const [isSortActive, setIsSortActive] = useState(false);

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

  const sortByTotalAmountSpent = (customers: Customer[]): Customer[] => {
    setSortedCustomers(
      customers.sort((a, b) => {
        const totalA = a.orders.reduce((acc, val) => acc + (val.total ?? 0), 0);
        const totalB = b.orders.reduce((acc, val) => acc + (val.total ?? 0), 0);
        return totalB - totalA;
      })
    );
  };

  const handleSearch = () => {
    setFilteredCustomers(
      customers.filter((item) =>
        selectedFilter === "name"
          ? item.name.toLowerCase().includes(searchValue.trim().toLowerCase())
          : item.email.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    );
    if (isSearchActive) {
      setIsSearchActive(false);
      setFilteredCustomers(customers);
      setSearchValue("");
    } else {
      setIsSearchActive(true);
    }
  };

  const handleSortStateChange = (prev: boolean) => {
    setIsSortActive(!prev);
  };

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            width: "100%",
            paddingBottom: 2,
          }}
        >
          <Typography
            sx={{ alignContent: "center" }}
            variant="h4"
            fontWeight="bold"
          >
            Customer Dashboard
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "4px",
            }}
          >
            <Chip
              sx={{
                color: "#080303",
                background: `${
                  isSortActive
                    ? "rgba(31, 101, 63, 0.619)"
                    : "rgba(37, 125, 76, 0.418)"
                }`,
                "&:hover": {
                  background: "rgba(26, 99, 59, 0.782)",
                  transition: "0.1s",
                },
              }}
              label="Sort by Total amount spent"
              icon={isSortActive ? <Check /> : <MonetizationOn />}
              onClick={() => {
                handleSortStateChange(isSortActive);
                sortByTotalAmountSpent(customers);
              }}
            />
            <SearchbarWithFilter
              filter={selectedFilter}
              onFilterChange={setSelectedFilter}
              searchValue={searchValue.trim()}
              onSearchValueChange={setSearchValue}
              onSearch={handleSearch}
              isSearchActive={isSearchActive}
              setIsSearchActive={setIsSearchActive}
            />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {filteredCustomers.map(({ id, name, email, orders }) => {
            const total = orders.reduce(
              (sum, order) => sum + (order.total ?? 0),
              0
            );

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
                  <CardContent sx={{ padding: 1 }}>
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
