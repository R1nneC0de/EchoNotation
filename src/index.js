// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: process.env.REACT_APP_COGNITO_AUTHORITY,
  client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_COGNITO_REDIRECT_URI,
  response_type: "code",
  scope: "email openid phone",

  metadata: {
    issuer: "https://us-east-200khnoypt.auth.us-east-2.amazoncognito.com",
    authorization_endpoint: "https://us-east-200khnoypt.auth.us-east-2.amazoncognito.com/oauth2/authorize",
    token_endpoint: "https://us-east-200khnoypt.auth.us-east-2.amazoncognito.com/oauth2/token",
    userinfo_endpoint: "https://us-east-200khnoypt.auth.us-east-2.amazoncognito.com/oauth2/userInfo",
    end_session_endpoint: "https://us-east-200khnoypt.auth.us-east-2.amazoncognito.com/logout",
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);