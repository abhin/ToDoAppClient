import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/Slice/userSlice";
import { setAuthUser } from "../redux/Slice/authSlice";
import { showError } from "../Functions/Message";
import { getProfilePicUrl } from "../Functions/utilities";

export default function UserProfile() {
  const { authUser } = useSelector((state) => state.Auth) || {};
  const { error } = useSelector((state) => state.User) || {};
  const { name = "", profilePic = "" } = authUser || {};

  const dispatch = useDispatch();
  const [uName, setUname] = useState(name);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", uName || name);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    setProfilePhoto(null);

    const userData = await dispatch(updateProfile({ formData })).unwrap();
    userData && dispatch(setAuthUser(userData)) || showError(error);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="card shadow-sm p-4">
          <h2 className="text-primary text-center mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Update Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={uName || ""}
                onChange={(e) => setUname(e.target.value)}
                style={{
                  borderColor: "#007bff",
                  color: "#007bff",
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="profilePhoto" className="form-label">
                Upload Profile Photo
              </label>
              {profilePic && (
                <img
                  className="m-2 d-block"
                  src={getProfilePicUrl(authUser)}
                  style={{ width: "150px", height: "150px" }}
                  alt="Profile"
                />
              )}
              <input
                type="file"
                className="form-control"
                id="profilePhoto"
                accept="image/*"
                onChange={(e) => setProfilePhoto(e.target.files[0])}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
