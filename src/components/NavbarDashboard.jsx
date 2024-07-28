import { Flex, Paper, Text, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { UserContext } from "../App";

function NavbarDashboard() {
  const user = useContext(UserContext);
  const { token } = user;
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function getUserName() {
      try {
        const res = await api.post(
          "/getUserInfo",
          {
            email: localStorage.getItem("email"),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem("userId", res.data.id);
        setUserName(res.data.data);
      } catch (e) {
        toast.error(e);
      }
    }
    getUserName();
  }, []);
  return (
    <Flex p={"10px 30px"} justify={"space-between"} align={"center"} mt={8}>
      <Paper>
        <Title c={"blue"} size={20}>
          DP Chatbot
        </Title>
      </Paper>
      <Text>{userName}</Text>
    </Flex>
  );
}

export default NavbarDashboard;
