import { Box, Center, Text, Title } from "@mantine/core";
import { useState } from "react";
import KnowledgeContainer from "../components/KnowledgeContainer";
import KnowledgeInput from "../components/KnowledgeInput";
import api from "../api";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

function FeedKnowledge() {
  async function getKnowledge() {
    const userId = localStorage.getItem("userId");
    try {
      const res = await api.get(`/knowledge/${userId}`);
      return res.data;
    } catch (error) {
      toast.error(`Error fetching knowledge: ${error.message}`);
    }
  }

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["knowledge"],
    queryFn: getKnowledge,
  });

  if (isPending) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>{error.message}</Text>;
  }

  return (
    <>
      <Center>
        <Box w={820} mt={20} p={20}>
          <Title order={3} mb={20} c={"#383838"}>
            Enter your paragraph
          </Title>
          <KnowledgeInput getKnowledge={getKnowledge} />
          <KnowledgeContainer data={data} />
        </Box>
      </Center>
    </>
  );
}

export default FeedKnowledge;
