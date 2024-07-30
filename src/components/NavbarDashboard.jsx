import { Flex, Paper, Text, Title } from "@mantine/core";

function NavbarDashboard() {
  return (
    <Flex p={"10px 30px"} justify={"space-between"} align={"center"} mt={8}>
      <Paper>
        <Title c={"blue"} size={20}>
          DP Chatbot
        </Title>
      </Paper>
      <Text>{localStorage.getItem("name")}</Text>
    </Flex>
  );
}

export default NavbarDashboard;
