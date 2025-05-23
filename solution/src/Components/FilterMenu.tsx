import {
  Divider,
  FormControlLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

interface FilterMenuProps {
  open: boolean;
  anchor: HTMLElement | null;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
}

const FilterMenu = ({
  filter,
  open,
  anchor,
  onChange,
  onClose,
}: FilterMenuProps) => {
  return (
    <Menu
      anchorEl={anchor}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, fontWeight: "bold", padding: 2 }}
      >
        Filter by:
      </Typography>
      <RadioGroup value={filter} onChange={onChange}>
        <MenuItem>
          <FormControlLabel
            sx={{ color: "#080303", padding: 2 }}
            value="name"
            control={<Radio />}
            label="Name"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            sx={{ color: "#080303", padding: 2 }}
            value="email"
            control={<Radio />}
            label="Email"
          />
        </MenuItem>
      </RadioGroup>
      <Divider sx={{ my: 2 }} />
    </Menu>
  );
};

export default FilterMenu;
