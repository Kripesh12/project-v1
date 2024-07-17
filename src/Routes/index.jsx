import { createBrowserRouter } from "react-router-dom";
import loginRoute from "./auth/loginRoute";
import landingPageRoute from "./landingPageRoute";
import signupRoute from "./auth/signupRoute";
import forgetRoute from "./auth/forgetRoute";
import dashboardRoute from "./dashboardRoute";
import resetRoute from "./auth/resetRoute";

const router = createBrowserRouter([
  landingPageRoute,
  loginRoute,
  signupRoute,
  forgetRoute,
  dashboardRoute,
  resetRoute,
]);
export default router;
