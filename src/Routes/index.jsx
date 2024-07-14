import { createBrowserRouter } from "react-router-dom";
import authRoute from "./authRoutes";
import dashboardRoute from "./dashboardRoute";

const router = createBrowserRouter([authRoute, dashboardRoute]);
export default router;
