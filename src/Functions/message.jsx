import { toast } from "react-toastify";

export const showError = (err) => {

  console.log(err)
  if (typeof err == "object") {
    err?.errors.forEach((error) => {
      toast.error(error?.msg);
    });
  } else toast.error(err);
};


export const showSuccess = (err) => {
  if (typeof err == "object") {
    err?.errors.forEach((error) => {
      toast.success(error?.msg);
    });
  } else toast.success(err);
};
