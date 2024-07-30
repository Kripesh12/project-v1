import VerifiedSignup from "../../page/auth/VerifiedSignup";

const verifiedSignupRoute = {
  path: "/signup/register/:token",
  element: <VerifiedSignup />,
};

export default verifiedSignupRoute;
