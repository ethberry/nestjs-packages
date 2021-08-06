import { makeStyles } from "@material-ui/core";

export default makeStyles(
  () => ({
    root: {
      position: "relative",
      minHeight: 40,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: "rgba(255,255,255,.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
  { name: "ProgressOverlay" },
);
