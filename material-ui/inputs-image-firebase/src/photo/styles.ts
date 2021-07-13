import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
  theme => ({
    images: {
      marginTop: theme.spacing(1),
    },
    media: {
      width: 200,
      height: 150,
    },
    progress: {
      width: 200,
      height: 150,
      border: "#D7D7D7 3px dashed",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
  {name: "ImageGallery"},
);
