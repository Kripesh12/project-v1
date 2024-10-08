import {
  Paper,
  Box,
  Title,
  Group,
  Button,
  Textarea,
  Center,
  LoadingOverlay,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { UserContext } from "../App";

function Prompt() {
  const user = useContext(UserContext);
  const { token } = user;
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  //Useeffect to initialize userdata and store it in local storage
  useEffect(() => {
    async function getUserDetail() {
      try {
        const { data } = await api.post(
          "/auth/get-info",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("avatar", data.avatar);
      } catch (e) {
        console.log(e.message);
      }
    }
    getUserDetail();
  }, []);

  //Handele Submit
  async function handleSubmit() {
    if (prompt.length < 5) {
      toast.error("Search must contain atleast 5 characters");
      return;
    }
    try {
      setLoading(true);
      const data = await api.post(
        "/knowledge/ask-question",
        {
          userId: localStorage.getItem("userId"),
          prompt: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(data.data.answer);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Center>
      <Box w={820} mt={50} p={20}>
        <Paper>
          <Title order={3} mb={20} c={"#383838"}>
            Enter your question
          </Title>
          <Textarea
            value={prompt}
            size="md"
            mb={10}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Group>
            <Button onClick={handleSubmit}>Ask Question</Button>
            <Button bg={"red"} onClick={() => setPrompt("")}>
              Clear
            </Button>
          </Group>
        </Paper>
        <Box pos={"relative"}>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Paper mt={100} bg={"#aeddf8"} p={20}>
            {response}
          </Paper>
        </Box>
      </Box>
    </Center>
  );
}

export default Prompt;
