import {
  FilterAlt,
  ManageSearchTwoTone,
  SearchOffTwoTone,
} from "@mui/icons-material";
import { Paper, IconButton, InputBase, Divider } from "@mui/material";
import { useState, type SetStateAction } from "react";
import FilterMenu from "./FilterMenu";
import type { SearchFilter } from "../types/customers";

interface SearchBarProps {
  filter: string;
  onFilterChange: React.Dispatch<SetStateAction<SearchFilter>>;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  onSearch: () => void;
  isSearchActive: boolean;
  setIsSearchActive: React.Dispatch<SetStateAction<boolean>>;
}

const SearchbarWithFilter = ({
  filter,
  onFilterChange,
  onSearch,
  onSearchValueChange,
  searchValue,
  isSearchActive,
  setIsSearchActive,
}: SearchBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.value as SearchFilter);
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          borderRadius: 3,
          alignContent: "center",
          color: "#080303",
          minWidth: "316px",
          background: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: `
    0 5px 10px rgba(154, 160, 185, 0.544),
    0 16px 40px rgba(234, 236, 247, 0.485)
  `,
        }}
        onSubmit={(event) => {
          event.preventDefault();
          onSearch();
        }}
      >
        <IconButton
          sx={{ p: "10px", color: "#080303" }}
          onClick={handleMenuOpen}
        >
          <FilterAlt />
        </IconButton>
        <InputBase
          value={searchValue}
          onChange={(event) => onSearchValueChange(event.target.value)}
          sx={{ ml: 1, flex: 1, color: "#080303" }}
          placeholder={`Search by ${filter}`}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={onSearch}
          color="primary"
          sx={{ p: "10px", color: "#080303" }}
          disabled={searchValue.length === 0}
        >
          {isSearchActive ? <SearchOffTwoTone /> : <ManageSearchTwoTone />}
        </IconButton>
      </Paper>
      <FilterMenu
        anchor={anchorEl}
        onChange={handleFilterChange}
        onClose={handleMenuClose}
        open={Boolean(anchorEl)}
        filter={filter}
      />
    </>
  );
};

export default SearchbarWithFilter;
