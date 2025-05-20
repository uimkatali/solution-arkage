import { Paper } from "@mui/material";
import ListOfCustomers from "./Components/ListOfCustomers";

function App() {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "space-between",
        width: "100%",
        backgroundColor: "yellowgreen",
      }}
    >
      <ListOfCustomers />
    </Paper>
  );
}

export default App;
