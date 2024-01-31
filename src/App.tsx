import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Rajdhani",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>hi</h1>
    </ThemeProvider>
  );
}
export default App;
