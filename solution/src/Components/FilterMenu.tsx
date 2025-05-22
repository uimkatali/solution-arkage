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
      sx={{
        p: "2px 4px",
        alignContent: "center",
        color: "#080303",
        background: "rgba(255, 255, 255, 0)",
      }}
      anchorEl={anchor}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Filter by:
      </Typography>
      <RadioGroup value={filter} onChange={onChange}>
        <MenuItem>
          <FormControlLabel value="name" control={<Radio />} label="Name" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel value="email" control={<Radio />} label="Email" />
        </MenuItem>
      </RadioGroup>
      <Divider />
    </Menu>
  );
};

export default FilterMenu;
