import { useNavigate, useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import { login, googleLogin, verifyGoogleUser } from "../redux/Slice/authSlice.jsx";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { token } = useParams();
  const { isExpired } = useJwt(token);


  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login({ email, password, navigate })).unwrap();
    data?.token && navigate("/dashboard");
  };

  const handleGoogleLogin = async () => {
    const data = await dispatch(verifyGoogleUser({ token, isExpired })).unwrap();
    data?.token && navigate("/dashboard");
  };

  useEffect(() => {
    if (token) {
      handleGoogleLogin();
    }
  }, [token]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow"
        style={{ width: "300px", backgroundColor: "#007bff" }}
      >
        <h2 className="text-center text-white mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              required
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              required
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-2">
            Login
          </button>
          <button
            type="button"
            className="btn btn-info w-100"
            onClick={() => dispatch(googleLogin())}
          >
            Google Login
          </button>
        </form>
      </div>
    </div>
  );
}
