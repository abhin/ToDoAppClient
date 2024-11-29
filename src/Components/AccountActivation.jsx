import { useNavigate } from "react-router-dom"; // If using React Router

export default function ActivationSuccess() {
  const navigate = useNavigate(); // Hook for navigation

  const handleGoToDashboard = () => {
    // Navigate to the dashboard or homepage
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-5 text-center">
        <h1 className="text-primary">Activation Successful!</h1>
        <p className="mt-3 text-secondary">
          Your account has been successfully activated. You can now access all features.
        </p>
        <div className="mt-4">
          <button
            className="btn btn-primary"
            onClick={handleGoToDashboard}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}