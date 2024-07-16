import Dashboard from "../layouts/Dashboard";
import Prompt from "../page/Prompt";

const dashboardRoute = {
  path: "/dashboard",
  element: <Dashboard />,

  children: [
    {
      path: "home",
      element: <h1>Landing Page</h1>,
    },
    {
      path: "prompt",
      element: <Prompt />,
    },
  ],
};

export default dashboardRoute;
