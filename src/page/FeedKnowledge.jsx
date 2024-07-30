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
import { useEffect, useState, useContext } from "react";

import api from "../api";
import { toast } from "react-toastify";
import { UserContext } from "../App";

function FeedKnowledge() {
  const user = useContext(UserContext);
  const { token } = user;
  const [opened, { open, close }] = useDisclosure(false);
  const [knowledge, setKnowledge] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchParagraph() {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      console.log(localStorage.getItem("userId"));
      try {
        const res = await api.get(`/knowledge/${userId}`);
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
    if (!confirm("Do you want to feed knowledge ?")) {
      return;
    }
    if (knowledge === "") {
      alert("Paragraph cannot be empty");
      return;
    }
    setLoading(true);
    try {
      await api.post(
        "/knowledge/create",
        {
          userId: localStorage.getItem("userId"),
          paragraph: knowledge,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Paragraph added");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
      console.log(knowledge);
    }
  }

  async function onClearKnowledge() {
    if (!confirm("Do you want to clear knowledge ?")) {
      return;
    }
    setLoading(true);
    try {
      await api.post(
        "/knowledge/create",
        {
          userId: localStorage.getItem("userId"),
          paragraph: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        <Box w={820} mt={50} p={20}>
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

          <Paper
            mih={80}
            p={20}
            w={"100%"}
            shadow="sm"
            withBorder={true}
            c={"#2e2e2e"}
          >
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
