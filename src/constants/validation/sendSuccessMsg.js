import { actions } from "../../redux/store/store";

export const sendSuccessMessage = (msg) => {
  if (msg && msg?.length > 0) {
    actions.notification.add({
      message: msg,
      status: "success",
    });
  }
};
