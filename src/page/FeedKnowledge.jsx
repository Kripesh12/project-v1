import { Box, Center, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import KnowledgeContainer from "../components/KnowledgeContainer";
import KnowledgeInput from "../components/KnowledgeInput";
import api from "../api";
import { toast } from "react-toastify";

function FeedKnowledge() {
  const [knowledgeArray, setKnowledgeArray] = useState([]);

  //Function to handel delete
  async function handelDeleteKnowledge(id) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/knowledge/${userId}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Knowledge deleted");
    } catch (e) {
      console.log(e.message);
    }
    setKnowledgeArray(
      knowledgeArray.filter((knowledge) => knowledge.id !== id)
    );
  }

  //Function to get knowledge array
  async function getKnowledge() {
    const userId = localStorage.getItem("userId");
    try {
      const res = await api.get(`/knowledge/${userId}`);
      setKnowledgeArray(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  //Load the knowledge on mount
  useEffect(() => {
    getKnowledge();
  }, []);

  return (
    <>
      <Center>
        <Box w={820} mt={20} p={20}>
          <Title order={3} mb={20} c={"#383838"}>
            Enter your paragraph
          </Title>
          <KnowledgeInput getKnowledge={getKnowledge} />
          <KnowledgeContainer
            knowledgeArray={knowledgeArray}
            getKnowledge={getKnowledge}
            handelDeleteKnowledge={handelDeleteKnowledge}
          />
        </Box>
      </Center>
    </>
  );
}

export default FeedKnowledge;
