import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import customers from "../mockdata/customerData.json";
const ListOfCustomers = () => {
  const theme = useTheme();
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
                    background: "rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    backdropFilter: "blur(120px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(175, 15, 15, 0.18)",
                    color: "#000",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Badge
                        badgeContent={orders.length}
                        color="primary"
                        overlap="circular"
                      >
                        <Avatar sx={{ bgcolor: "#4caf50" }}></Avatar>
                      </Badge>
                      <Box>
                        <Typography variant="h6">{name}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          {email}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      Total Spent
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${total.toFixed(2)}
                    </Typography>
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
