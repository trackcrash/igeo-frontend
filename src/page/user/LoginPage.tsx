import { useAuth } from "../../layout/header/AuthConText";
import { Box } from "@chakra-ui/react";
import GoogleLoginButton from "../../oauth/google/GoogleLogin";

import "./css/LoginPage.css";

const LoginPage = () => {
  const { setIsLoggedIn } = useAuth();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <div className="login-container">
        <div className="login-icons">
          <div className="login-text">
            <h2>로그인·회원가입</h2>
            <GoogleLoginButton onSuccess={handleLoginSuccess} />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default LoginPage;
