import { Button, Group, Modal, Paper, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

function FeedKnowledge() {
  const [opened, { open, close }] = useDisclosure(false);
  const [knowledge, setKnowledge] = useState();

  useEffect(() => {
    async function fetchParagraph() {
      try {
        const res = await api.post("/get-paragraph", {
          email: localStorage.getItem("email"),
        });
        setKnowledge(res.data.paragraph);
        console.log(res.data.paragraph);
      } catch (e) {}
    }
    fetchParagraph();
  }, []);

  async function onFeedKnowledge() {
    try {
      await api.post("/create-paragraph", {
        email: localStorage.getItem("email"),
        newParagraph: knowledge,
      });
      toast.success("Paragraph added");
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="">
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

      <Paper bg={"#bdbdbd"} mih={50} maw={750} p={20} onClick={open}>
        {knowledge == "" ? "No paragraph provided" : knowledge}
      </Paper>
      <Group mt={20}>
        <Button onClick={onFeedKnowledge}>Feed Knowledge</Button>
        <Button bg={"red"} onClick={() => setKnowledge("")}>
          Clear Knowledge
        </Button>
      </Group>
    </>
  );
}

export default FeedKnowledge;
