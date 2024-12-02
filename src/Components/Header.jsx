import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/Slice/authSlice";
import { getProfilePicUrl } from "../Functions/utilities";

function Header() {
  const { authUser } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

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
            {authUser && (
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
                    {authUser.name}
                  </Link>
                </li>
                {authUser.profilePic && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-profile">
                    
                      <img
                        src={getProfilePicUrl(authUser)}
                        style={{ width: "40px", height: "40px" }}
                      />
                    </Link>
                  </li>
                )}
              </>
            )}
            {!authUser && (
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
