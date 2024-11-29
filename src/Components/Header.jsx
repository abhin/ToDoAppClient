import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/Slice/authSlice";

function Header() {
  const { user } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const profilePic = `http://localhost:8000/${user?.profilePic}`;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ToDo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => dispatch(logout())}
                    type="button"
                    className="btn btn-link"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user-profile">
                    {user.name}
                  </Link>
                </li>
                {user.profilePic && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-profile">
                      <img
                        src={profilePic}
                        style={{ width: "40px", height: "40px" }}
                      />
                    </Link>
                  </li>
                )}
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
