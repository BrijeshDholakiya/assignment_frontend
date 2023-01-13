import { actions } from "../../redux/store/store";

export const checkForError = (error) => {
  const message = error
    ? error?.message ||
      error?.error ||
      (error?.data && error?.data?.message) ||
      error?.data
    : null;
  if (!error) return;
  actions.notification.add({
    message: message || "Something went wrong!",
    status: "error",
  });
};

export const isArray = (data) => {
  if (!data || !Array.isArray(data)) return false;
  return true;
};
