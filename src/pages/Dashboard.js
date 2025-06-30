import React from "react";
import { useAuth } from "react-oidc-context";

const Dashboard = () => {
  const auth = useAuth();

  const callBackend = async () => {
    if (!auth.user?.access_token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user.access_token}`,
        },
      });

      if (!res.ok) {
  const text = await res.text(); // read plain response
  throw new Error(`Backend error (${res.status}): ${text}`);
}

const data = await res.json();
console.log("API response:", data);
      alert(`Backend says: ${data.message}\nUser ID: ${data.userId}`);
    } catch (error) {
      console.error("Error calling backend:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      {auth.user ? (
        <>
          <p>Logged in as: {auth.user.profile?.email}</p>
          <button onClick={callBackend}>Call API with Token</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Dashboard;
