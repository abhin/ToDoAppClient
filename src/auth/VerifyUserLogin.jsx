import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function VerifyUserLogin({ children }) {
  const { authUser } = useSelector((state) => state.Auth);

  if (authUser == null) return <Navigate to="/login" />;
  else return children;
}
