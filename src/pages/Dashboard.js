const Dashboard = () => {
  const authCode = localStorage.getItem("authCode");

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Welcome to your dashboard!</h2>
      <p className="mt-4 text-gray-700">
        Auth code from Cognito: <br />
        <span className="font-mono">{authCode}</span>
      </p>
    </div>
  );
};

export default Dashboard;
