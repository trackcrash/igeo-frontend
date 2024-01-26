import { getImageUrl } from "@/utility/s3/awsS3";

import "../css/LoginButton.css";

interface googleLoginProps {
  onSuccess: () => void;
}

const GoogleLoginButton: React.FC<googleLoginProps> = ({ onSuccess }) => {
  const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`;
  const REDIRECT_URI = `${process.env.REACT_APP_GOOGLE_REDIRECT_URL}`;
  const googleURL =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    "scope=https://www.googleapis.com/auth/userinfo.profile" +
    "+https://www.googleapis.com/auth/userinfo.email&" +
    "response_type=code&" +
    `redirect_uri=${REDIRECT_URI}&` +
    `client_id=${CLIENT_ID}&` +
    "access_type=offline";

  return (
    <div className="oauth-login-btn-container" onClick={() => window.location.replace(googleURL)}>
      <div>
        <img className="oauth-login-btn" alt="구글 로그인" src="/img/GoogleLoginIcon.png" />
        {/* 520 x 78 */}
      </div>
      <div className="oauth-login-text">구글 로그인</div>
    </div>
  );
};

export default GoogleLoginButton;
