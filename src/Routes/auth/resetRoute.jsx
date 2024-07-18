import PasswordReset from "../../page/auth/PasswordReset";

const resetRoute = {
  path: "/reset-password/:token",
  element: <PasswordReset />,
};

export default resetRoute;
