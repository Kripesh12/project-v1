import Dashboard from "../layouts/Dashboard";
import LogoutPage from "../page/auth/LogoutPage";
import FeedKnowledge from "../page/FeedKnowledge";
import Pricing from "../page/Pricing";
import Prompt from "../page/Prompt";
import Script from "../page/Script";
import Statistics from "../page/Statistics";
import UserLeads from "../page/UserLeads";

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
    {
      path: "script",
      element: <Script />,
    },
    {
      path: "leads",
      element: <UserLeads />,
    },
  ],
};

export default dashboardRoute;
