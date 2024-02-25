import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface googleLoginProps {
  onSuccess: () => void;
}

const GoogleLoginButton: React.FC<googleLoginProps> = ({ onSuccess }) => {
  // const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`;
  // const REDIRECT_URI = `${process.env.REACT_APP_GOOGLE_REDIRECT_URL}`;
  // const googleURL =
  //   "https://accounts.google.com/o/oauth2/v2/auth?" +
  //   "scope=https://www.googleapis.com/auth/userinfo.profile" +
  //   "+https://www.googleapis.com/auth/userinfo.email&" +
  //   "response_type=code&" +
  //   `redirect_uri=${REDIRECT_URI}&` +
  //   `client_id=${CLIENT_ID}&` +
  //   "access_type=offline";
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
  const googleURL = `${BASE_URL}/login/google`;

  return (
    <Box position={"relative"}>
      <Flex justifyContent={"center"}>
        <Flex cursor={"pointer"} onClick={() => window.location.replace(googleURL)}>
          <Text
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
            color={"black"}
            fontWeight={"bold"}
            fontSize={"xl"}
          >
            구글 로그인
          </Text>
          <Image alt={"googleLogin"} src={"/img/GoogleLoginIcon.png"} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default GoogleLoginButton;
