import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Routes from "./routes/index";

import { LanguageContextProvider } from "./resources";
import "./App.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

function App() {
  const config = useSelector((state) => state.employee.config);
  let theme = createTheme({
    palette: {
      primary: {
        main: "#44A38B",
      },
      secondary: {
        main: "#EDDD64",
      },
      darkGray: {
        main: "#434343",
      },
      gray: {
        main: "#9A9A9A",
      },
      error: {
        main: "#EE715B",
      },
      success: {
        main: "#19C69A",
      },
    },
  });
  const [themeColor, setThemeColor] = useState(theme);

  useEffect(() => {
    if (Object.keys(config).length > 0) {
      if (Object.keys(config.color).length > 0) {
        setThemeColor(
          createTheme({
            palette: {
              primary: {
                main: config.color.PrimaryColor,
              },
              secondary: {
                main: config.color.SecondaryColor,
              },
              darkGray: {
                main: "#434343",
              },
              gray: {
                main: "#9A9A9A",
              },
              error: {
                main: config.color.ErrorColor,
              },
              success: {
                main: config.color.SuccessColor,
              },
            },
          }),
        );
      }
    } else {
      setThemeColor(
        createTheme({
          palette: {
            primary: {
              main: "#44A38B",
            },
            secondary: {
              main: "#EDDD64",
            },
            darkGray: {
              main: "#434343",
            },
            gray: {
              main: "#9A9A9A",
            },
            error: {
              main: "#EE715B",
            },
            success: {
              main: "#19C69A",
            },
          },
        }),
      );
    }
  }, [config]);

  return (
    <ThemeProvider theme={themeColor}>
      <Container
        disableGutters
        maxWidth={false}
        className="main-container fill-window"
      >
        <LanguageContextProvider>
          <Routes />
        </LanguageContextProvider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
