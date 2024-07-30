import PasswordReset from "../../page/auth/PasswordReset";

const resetRoute = {
  path: "/auth/reset-password/:token",
  element: <PasswordReset />,
};

export default resetRoute;
