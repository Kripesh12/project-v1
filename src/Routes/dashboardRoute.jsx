import Dashboard from "../layouts/Dashboard";
import LogoutPage from "../page/auth/LogoutPage";
import ChatbotDetails from "../page/ChatbotDetails";
import FeedKnowledge from "../page/FeedKnowledge";
import Key from "../page/Script";
import Prompt from "../page/Prompt";
import Statistics from "../page/Statistics";
import UserLeads from "../page/UserLeads";
import UserPrompt from "../page/UserPrompt";

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
      path: "details",
      element: <ChatbotDetails />,
    },
    {
      path: "leads",
      element: <UserLeads />,
    },
    {
      path: "script",
      element: <Key />,
    },
    {
      path: "user-prompt",
      element: <UserPrompt />,
    },
  ],
};

export default dashboardRoute;
