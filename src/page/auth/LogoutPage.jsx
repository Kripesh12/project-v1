import { Box, Button, Center, Group, Paper, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const navigate = useNavigate();
  function handelLogout() {
    localStorage.clear();
    navigate("/");
    toast.success("Logout Sucessfully");
  }

  function handelCancel() {
    navigate("/dashboard/prompt");
  }
  return (
    <Center>
      <Box>
        <Paper w={350} ta={"center"} p={40} withBorder={true} shadow="sm">
          <Title fz={"h5"} mb={20} c={"#414141"}>
            Do you want to logout?
          </Title>
          <Group justify="center" mt={40}>
            <Button onClick={handelCancel}>Cancel</Button>
            <Button bg={"red"} onClick={handelLogout}>
              Logout
            </Button>
          </Group>
        </Paper>
      </Box>
    </Center>
  );
}

export default LogoutPage;
