import { Box, Chip, Grid, Typography } from "@mui/material";
import customers from "../mockdata/customerData.json";
import { useState } from "react";
import ViewOrdersModal from "./ViewOrdersModal";
import type { Customer, SearchFilter } from "../types/customers";
import { Check, MonetizationOn } from "@mui/icons-material";
import SearchbarWithFilter from "./SearchbarWithFilter";
import CustomerCard from "./CustomerCard";

const ListOfCustomers = () => {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedFilter, setSelectedFilter] = useState<SearchFilter>("name");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredCustomers, setFilteredCustomers] =
    useState<Customer[]>(customers);
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

  const sortByTotalAmountSpent = (customers: Customer[]) => {
    setFilteredCustomers(
      customers.sort((a, b) => {
        const totalA = a.orders.reduce((acc, val) => acc + (val.total ?? 0), 0);
        const totalB = b.orders.reduce((acc, val) => acc + (val.total ?? 0), 0);
        return isSortActive ? totalB - totalA : totalA - totalB;
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
    sortByTotalAmountSpent(filteredCustomers);
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
                <CustomerCard
                  email={email}
                  name={name}
                  total={total}
                  orders={orders}
                  onViewOrders={() => {
                    handleOpenOrdersModal(
                      customers.find((item: Customer) => item.id === id)
                    );
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {selectedCustomer && (
        <ViewOrdersModal
          open={open}
          onClose={() => handleCloseOrdersModal()}
          selectedCustomer={selectedCustomer}
        />
      )}
    </>
  );
};

export default ListOfCustomers;
