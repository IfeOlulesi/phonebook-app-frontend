import React from "react";

import { createTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import { CircularProgress } from '@material-ui/core'  

const useStyles = makeStyles((theme) => ({
  loaderWrapper: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  }
}))

const theme = createTheme({
  palette: {
    primary: {
      main: "#222",
    },
  },
});



const LoadingOverlay = () => {

  const classes = useStyles();

  return (
    <div className={`${classes.loaderWrapper}`}>
      <ThemeProvider theme={theme}>
        <CircularProgress />
      </ThemeProvider>
    </div>
  )
}

export default LoadingOverlay;