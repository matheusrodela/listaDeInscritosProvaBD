import { Box } from "@mui/material";

import Header from "../header";
import Footer from "../footer";
import MainCard from "../mainCard";

const MainComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        overflowX: "hidden",
        p: 0,
        m: 0,
      }}
    >
      <Header />
      <MainCard />
      <Footer />
    </Box>
  );
};

export default MainComponent;
