import { createBrowserRouter } from "react-router-dom";
import loginRoute from "./auth/loginRoute";
import landingPageRoute from "./landingPageRoute";
import signupRoute from "./auth/signupRoute";
import forgetRoute from "./auth/forgetRoute";
import dashboardRoute from "./dashboardRoute";
import resetRoute from "./auth/resetRoute";
import verifiedSignupRoute from "./auth/verifiedSignupRoute";

const router = createBrowserRouter([
  landingPageRoute,
  loginRoute,
  signupRoute,
  forgetRoute,
  dashboardRoute,
  resetRoute,
  verifiedSignupRoute,
]);
export default router;
