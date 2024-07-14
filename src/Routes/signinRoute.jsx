import LandingPageLayout from "../layouts/LandingPageLayout";
import SigninPage from "../page/SigninPage";
import SigninLayout from "../page/SigninPage";

const signinRoute = {
  path: "/",
  element: <LandingPageLayout />,
  children: [
    {
      path: "/",
      element: "",
    },
    {
      path: "signin",
      element: <SigninPage />,
    },
  ],
};

export default signinRoute;
