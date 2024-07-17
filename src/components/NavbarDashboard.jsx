import { Button, Flex, Paper } from "@mantine/core";

function NavbarDashboard() {
  return (
    <Flex m={"10px 30px"} justify={"space-between"} align={"center"}>
      <Paper>DP</Paper>
      <Button>Logout</Button>
    </Flex>
  );
}

export default NavbarDashboard;
