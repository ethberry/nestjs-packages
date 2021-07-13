import {makeStyles} from "@material-ui/core";

export default makeStyles(
  () => ({
    placeholder: {
      width: 200,
      height: 150,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: "100%",
      height: "100%",
      border: "#D7D7D7 3px dashed",
      color: "#D7D7D7",
    },
  }),
  {name: "InputFile"},
);
