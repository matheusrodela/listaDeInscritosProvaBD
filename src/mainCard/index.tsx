import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

import CardPresenca from "../cardPresenca";

const MainCard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // January is 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const today = new Date();
  const formattedDate = formatDate(today);

  const getExamLocation = (value: number) => {
    switch (value) {
      case 0:
        return "Escola Municipal Coronel Praxedes";
      case 1:
        return "Escola Municipal Dona Duca";
      case 2:
        return "Prefeitura Municipal de Bom Despacho (Sede da Prefeitura)";
      case 3:
        return "Escola Municipal Flávio Cançado";
      default:
        return "Escola Municipal Coronel Praxedes";
    }
  };

  const renderComponent = (location: string) => {
    return <CardPresenca examLocation={location} />;
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        pt: { xs: "30%", sm: "25%", md: "15%", lg: "10%", xl: "10%" },
        pb: { xs: "20%", sm: "17%", md: "12%", lg: "8%", xl: "8%" },
        minHeight: "45vh",
        width: "100vw",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          width: { xs: "80%", sm: "80%", md: "70%", lg: "60%", xl: "60%" },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Escola Coronel Praxedes" />
          <Tab label="Escola Dona Duca" />
          <Tab label="Prefeitura" />
          <Tab label="Flávio Cançado" />
        </Tabs>
        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{
            minHeight: "45vh",
            px: 5,
            py: 3,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Lista de presença - {formattedDate}
          </Typography>
          {renderComponent(getExamLocation(value))}
        </Box>
      </Paper>
    </Box>
  );
};

export default MainCard;
