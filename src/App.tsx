import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Rajdhani",
  },
});

import MainComponent from "./mainComponent";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainComponent />
    </ThemeProvider>
  );
}
export default App;
