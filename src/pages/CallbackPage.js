import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      // Store code locally (optional)
      localStorage.setItem("authCode", code);

      // For now, just redirect to dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
};

export default CallbackPage;
