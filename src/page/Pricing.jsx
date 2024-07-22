import { Box, Center, Paper, Title, Text, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

export default function Pricing() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function fetchCount() {
      try {
        const data = await api.post("/get-count", {
          email: localStorage.getItem("email"),
        });
        setCount(data.data.count);
      } catch (e) {
        toast.error(`Cannot fetch count : ${e.message}`);
      }
    }
    fetchCount();
  }, []);
  return (
    <Center>
      <Box w={650} mt={50} p={20}>
        <Title order={3} mb={20} c={"#383838"}>
          Total Pricing
        </Title>
        <Paper withBorder={true} shadow="sm" p={30}>
          <Title order={4} c={"gray"}>
            Charges
          </Title>
          <Text mt={20} c={"#383838"}>
            Total charged untill today
          </Text>
          <Title mt={10} c={"#3d3d3df"}>
            ${count * 0.75}
          </Title>
        </Paper>
      </Box>
    </Center>
  );
}
