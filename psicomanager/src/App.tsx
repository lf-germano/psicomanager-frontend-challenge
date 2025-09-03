import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Home />
    </ThemeProvider>
  );
}

export default App;
