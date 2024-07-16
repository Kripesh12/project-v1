import { createBrowserRouter } from "react-router-dom";
import loginRoute from "./auth/loginRoute";
import landingPageRoute from "./landingPageRoute";
import signupRoute from "./auth/signupRoute";
import resetRoute from "./auth/resetRoute";
import dashboardRoute from "./dashboardRoute";

const router = createBrowserRouter([
  landingPageRoute,
  loginRoute,
  signupRoute,
  resetRoute,
  dashboardRoute,
]);
export default router;
