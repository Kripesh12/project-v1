import { Button, Flex, Paper, Text, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import { GrTechnology } from "react-icons/gr";

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
        <Title c={"blue"}>
          <GrTechnology />
        </Title>
      </Paper>
      <Text>{userName}</Text>
    </Flex>
  );
}

export default NavbarDashboard;
