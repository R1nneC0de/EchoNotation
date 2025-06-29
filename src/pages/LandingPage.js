const CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID;
const DOMAIN = process.env.REACT_APP_COGNITO_DOMAIN;
const REDIRECT_URI = process.env.REACT_APP_COGNITO_REDIRECT_URI;

const LandingPage = () => {
  const loginUrl = `https://${DOMAIN}/login?client_id=${CLIENT_ID}&response_type=code&scope=email+openid+phone&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  console.log("Login URL:", loginUrl);


  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-6">EchoNotation</h1>
      <a href={loginUrl}>
        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Login with Cognito
        </button>
      </a>
    </div>
  );
};

export default LandingPage;
