import { useAuth } from "../../layout/header/AuthConText";
import { Flex, Text } from "@chakra-ui/react";
import GoogleLoginButton from "oauth/google/GoogleLogin";

const LoginPage: React.FC = () => {
  const { setIsLoggedIn } = useAuth();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Flex h={"50vh"} flexDirection={"column"} justifyContent={"center"}>
      <Text fontSize={"xl"}>로그인·회원가입</Text>
      <GoogleLoginButton onSuccess={handleLoginSuccess} />
    </Flex>
  );
};

export default LoginPage;
