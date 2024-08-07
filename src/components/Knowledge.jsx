import {
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { MdEditSquare, MdDelete } from "react-icons/md";
import api from "../api";
import { toast } from "react-toastify";

function Knowledge({ data, handelDeleteKnowledge, getKnowledge }) {
  //For Update Model
  const [opended, setOpened] = useState(false);
  //For Delete Model
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  //Use Form
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      newCategory: data.category,
      newKnowledge: data.paragraph,
    },
    validate: {
      newCategory: (value) =>
        /^(?!\s*$).+/.test(value) ? null : "Category cannot be empty",

      newKnowledge: (value) =>
        /^.{5,}$/.test(value)
          ? null
          : "Knowledge must be of at least 20 character",
    },
  });

  //Update in Database
  async function updateKnowledge() {
    const userId = localStorage.getItem("userId");
    setLoading(true);
    try {
      await api.patch("/knowledge/update", {
        userId,
        id: data.id,
        paragraph: form.getValues().newKnowledge,
        category: form.getValues().newCategory,
      });
      getKnowledge();
      setOpened(false); //Close the modal on success
      toast.success("Knowledge updated");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <Text p={5} bg={"#397eff"} c={"white"}>
        {data.category}
      </Text>
      <Paper p={20} withBorder={true} shadow="sm">
        <Text>{data.paragraph}</Text>
        <Group mt={30} justify="space-between">
          <MdEditSquare
            size={25}
            color="#1C7ED6"
            cursor={"pointer"}
            onClick={() => setOpened(true)}
          />
          <MdDelete
            size={25}
            color="red"
            cursor={"pointer"}
            onClick={() => setDeleteModalOpened(true)}
          />
        </Group>
      </Paper>
      {/* ------------------Update Modal----------------------- */}
      <Modal
        opened={opended}
        onClose={() => setOpened(false)}
        title="Update Knowledge"
      >
        <form onSubmit={form.onSubmit(updateKnowledge)}>
          <Textarea
            autosize
            label="New Paragraph"
            minRows={8}
            placeholder="Type here..."
            key={form.key("newKnowledge")}
            {...form.getInputProps("newKnowledge")}
          />

          <TextInput
            mt={10}
            label="New Category"
            placeholder="Enter your new paragrah"
            key={form.key("newCategory")}
            {...form.getInputProps("newCategory")}
          />
          <Button mt={10} type="submit" loading={loading}>
            Update
          </Button>
        </form>
      </Modal>

      {/* ------------------Delete Modal----------------------- */}
      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Confirm Deletion"
      >
        <Text>Are you sure you want to delete this knowledge entry?</Text>
        <Group mt={20} position="right">
          <Button variant="outline" onClick={() => setDeleteModalOpened(false)}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => handelDeleteKnowledge(data.id)}
            loading={loading}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}

export default Knowledge;
