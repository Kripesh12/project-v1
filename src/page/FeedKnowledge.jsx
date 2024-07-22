import {
  Button,
  Box,
  Center,
  Group,
  Modal,
  Paper,
  Textarea,
  Title,
  LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import api from "../api";
import { toast } from "react-toastify";

function FeedKnowledge() {
  const [opened, { open, close }] = useDisclosure(false);
  const [knowledge, setKnowledge] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchParagraph() {
      setLoading(true);
      try {
        const res = await api.post("/get-paragraph", {
          email: localStorage.getItem("email"),
        });
        setKnowledge(res.data.paragraph);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchParagraph();
  }, []);

  async function onFeedKnowledge() {
    if (knowledge === "") {
      alert("Paragraph cannot be empty");
      return;
    }
    setLoading(true);
    try {
      await api.post("/create-paragraph", {
        email: localStorage.getItem("email"),
        newParagraph: knowledge,
      });
      toast.success("Paragraph added");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function onClearKnowledge() {
    setLoading(true);
    try {
      await api.post("/create-paragraph", {
        email: localStorage.getItem("email"),
        newParagraph: "",
      });
      setKnowledge("");
      toast.success("Paragraph Removed");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Center>
        <Box w={820}>
          <Title order={3} mb={20} c={"#383838"}>
            Enter your paragraph
          </Title>
          <Modal opened={opened} onClose={close} title="Insert Paragraph">
            <Paper>
              <Textarea
                autosize
                maw={"712px"}
                size="lg"
                value={knowledge}
                minRows={50}
                maxRows={10}
                placeholder="Type here..."
                onChange={(e) => setKnowledge(e.target.value)}
              />
              <Group mt={20}>
                <Button onClick={close}>Done</Button>
                <Button bg={"red"} onClick={() => setKnowledge("")}>
                  Clear
                </Button>
              </Group>
            </Paper>
          </Modal>

          <Paper bg={"#bdbdbd"} mih={80} p={20} w={"100%"}>
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
            {knowledge == ""
              ? "No paragraph provided. Please create paragraph to feed knowledge"
              : knowledge}
          </Paper>
          <Group mt={20}>
            <Button
              onClick={onFeedKnowledge}
              disabled={knowledge ? false : true}
            >
              Feed Knowledge
            </Button>

            <Button color="green" onClick={open}>
              {knowledge ? "Edit Knowledge" : "Create Knowledge"}
            </Button>

            <Button
              bg={"red"}
              onClick={onClearKnowledge}
              disabled={knowledge ? false : true}
            >
              Clear Knowledge
            </Button>
          </Group>
        </Box>
      </Center>
    </>
  );
}

export default FeedKnowledge;
