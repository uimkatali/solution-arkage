import {
  Card,
  CardContent,
  Box,
  Badge,
  Avatar,
  Chip,
  Button,
} from "@mui/material";
import type { Order } from "../types/customers";

interface CustomerCardProps {
  name: string;
  total: number;
  email: string;
  orders: Order[];
  onViewOrders: () => void;
}

const CustomerCard = ({
  email,
  orders,
  name,
  total,
  onViewOrders,
}: CustomerCardProps) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        padding: 2,
        border: "1px solid rgba(175, 15, 15, 0.18)",
        color: "#080303",
        transition: "0.1s",
        "&:hover": {
          boxShadow: 2,
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
              { value: total.toFixed(2), description: "Total amount spent: €" },
            ].map((item) => (
              <Chip
                key={item.description}
                sx={{
                  background: "rgba(14, 126, 65, 0.37)",
                  justifyContent: "start",
                  width: "100%",
                }}
                label={item.description.concat(item.value as string)}
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
          onClick={onViewOrders}
        >
          View Orders
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
