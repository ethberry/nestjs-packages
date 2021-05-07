import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
  theme => ({
    label: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0,
    },
    slider: {
      marginLeft: theme.spacing(2),
    },
  }),
  {name: "Slider"},
);
