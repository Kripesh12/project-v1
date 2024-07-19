import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Paper, Group, Box } from "@mantine/core";
import { useState } from "react";

function KnowledgeModel({ children }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [knowledge, setKnowledge] = useState("");
  return (
    <>
      <Modal opened={opened} onClose={close} title=""></Modal>

      <Paper bg={"#bdbdbd"} mih={50} maw={750} p={20} onClick={open}>
        This is a simple paper
      </Paper>
      <Group mt={20}>
        <Button onClick={open}>Feed Knowledge</Button>
        <Button>Clear Knowledge</Button>
      </Group>

      {/* <Button onClick={open}>Open modal</Button> */}
    </>
  );
}

export default KnowledgeModel;
