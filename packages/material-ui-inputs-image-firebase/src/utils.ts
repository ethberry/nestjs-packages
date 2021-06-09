import firebase from "@trejgun/firebase";
import {useSnackbar} from "notistack";
import {useIntl} from "react-intl";

export const deleteUrl = async (imageUrl: string): Promise<void> => {
  const storageRef = firebase.storage().ref();

  const {enqueueSnackbar} = useSnackbar();
  const {formatMessage} = useIntl();

  return storageRef
    .child(imageUrl)
    .delete()
    .then(message => {
      console.info("message", message);
      enqueueSnackbar(formatMessage({id: "snackbar.deleted"}), {variant: "success"});
    })
    .catch(e => {
      console.error(e);
      if (e.code !== "storage/object-not-found") {
        enqueueSnackbar(formatMessage({id: "snackbar.error"}), {variant: "error"});
      }
    });
};
