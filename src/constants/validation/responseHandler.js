import { checkForError } from "./errorHandlers";
import { sendSuccessMessage } from "./sendSuccessMsg";

const isSuccess = (response, msg) => {
  if (response?.data?.success && !response?.message) {
    return sendSuccessMessage(msg);
  } else {
    const error =
      response?.error?.message || response?.message || "Something went wrong!";
    checkForError(error);
    return new Error(error);
  }
};

export default isSuccess;
