import env from "react-dotenv";
import { toast } from "react-toastify";

export const showError = (err) => {

  console.log(err)
  if (typeof err == "object") {
    err?.errors.forEach((error) => {
      toast.error(error?.msg);
    });
  } else toast.error(err);
};


export const showSuccess = (msg) => {
  toast.success(msg);
};


export const getEnvValue = (key) => {
  env[key];
};

export const fetchAPI = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
