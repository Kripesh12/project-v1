import { Box } from "@mantine/core";
import { Outlet } from "react-router-dom";

function WebsiteLayout() {
  return (
    <>
      <Box>I am Navbar</Box>
      <Outlet />
      <Box>I am footer</Box>
    </>
  );
}

export default WebsiteLayout;
