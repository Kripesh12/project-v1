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
import { useContext, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { UserContext } from "../App";

function Prompt() {
  const user = useContext(UserContext);
  const { token } = user;
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (prompt.length < 5) {
      toast.error("Search must contain atleast 5 characters");
      return;
    }
    try {
      setLoading(true);
      const data = await api.post(
        "/ask-question",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(data.data.formattedText);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Center>
      <Box w={820}>
        <Paper>
          <Title order={3} mb={20} c={"#383838"}>
            Enter your question
          </Title>
          <Textarea
            size="md"
            mb={10}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Group>
            <Button onClick={handleSubmit}>Ask Question</Button>
            <Button bg={"red"} onClick={() => setPrompt("Null")}>
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
