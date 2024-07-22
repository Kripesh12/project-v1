import Dashboard from "../layouts/Dashboard";
import LogoutPage from "../page/auth/LogoutPage";
import FeedKnowledge from "../page/FeedKnowledge";
import Prompt from "../page/Prompt";
import Statistics from "../page/Statistics";

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
    {
      path: "stats",
      element: <Statistics />,
    },
  ],
};

export default dashboardRoute;
