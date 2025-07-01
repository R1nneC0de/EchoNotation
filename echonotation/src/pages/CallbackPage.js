// pages/CallbackPage.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const CallbackPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      // ✅ Store id_token if available
      if (auth.user && auth.user.id_token) {
        localStorage.setItem("idToken", auth.user.id_token);
        console.log("✅ idToken stored in localStorage");
      } else {
        console.warn("⚠️ id_token not found in auth.user");
      }

      navigate("/dashboard");
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.user, navigate]);

  return <div>Completing login...</div>;
};

export default CallbackPage;
