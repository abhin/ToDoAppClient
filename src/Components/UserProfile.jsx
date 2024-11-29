import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/Slice/userSlice";

export default function UserProfile() {
  const { user } = useSelector((state) => state.Auth) || {};
  const { name = "", profilePic = "" } = user || {};
  
  const dispatch = useDispatch();
  const [uName, setUname] = useState(name);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", uName || name);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    setProfilePhoto(null);
    dispatch(updateProfile({ formData }));
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
                  src={`http://localhost:8000/${profilePic}`}
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