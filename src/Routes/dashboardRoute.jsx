import Dashboard from "../layouts/Dashboard";
import LogoutPage from "../page/auth/LogoutPage";
import FeedKnowledge from "../page/FeedKnowledge";
import Prompt from "../page/Prompt";

const dashboardRoute = {
  path: "/dashboard",
  element: <Dashboard />,

  children: [
    {
      path: "prompt",
      element: <Prompt />,
    },
    {
      path: "logout",
      element: <LogoutPage />,
    },
    {
      path: "knowledge",
      element: <FeedKnowledge />,
    },
  ],
};

export default dashboardRoute;
