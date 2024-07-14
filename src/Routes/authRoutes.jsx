import WebsiteLayout from "../layout/WebsiteLayout";
import SignInPage from "../page/auth/SignIn";

const authRoute = {
  path: "auth",
  element: <WebsiteLayout />,
  children: [
    {
      path: "signin",
      element: <SignInPage />,
    },
    {
      path: "signin2",
      element: <SignInPage />,
    },
    {
      path: "signin3",
      element: <SignInPage />,
    },
    {
      path: "signin4",
      element: <SignInPage />,
    },
  ],
};

export default authRoute;
