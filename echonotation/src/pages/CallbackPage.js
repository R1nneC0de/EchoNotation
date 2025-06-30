// pages/CallbackPage.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const CallbackPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isLoading, auth.isAuthenticated, navigate]);

  return <div>Completing login...</div>;
};

export default CallbackPage;
