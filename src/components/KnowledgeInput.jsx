import { Box, Button, Input, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";

function KnowledgeInput({ getKnowledge }) {
  const [loading, setLoading] = useState(false);

  //UseForm
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      paragraph: "",
      category: "",
    },
    validate: {
      paragraph: (value) =>
        /^(?!\s*$).+/.test(value) ? null : "Paragraph cannot be empty",
      category: (value) =>
        /^(?!\s*$).+/.test(value) ? null : "Category cannot be empty",
    },
  });
  async function createKnowledge() {
    setLoading(true);
    try {
      await api.post(
        "/knowledge/create",
        {
          userId: localStorage.getItem("userId"),
          paragraph: form.getValues().paragraph,
          category: form.getValues().category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getKnowledge();
      form.reset();
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box>
      <form onSubmit={form.onSubmit(createKnowledge)}>
        <Textarea
          autosize
          minRows={5}
          maxRows={7}
          placeholder="Type here..."
          key={form.key("paragraph")}
          {...form.getInputProps("paragraph")}
        />
        <TextInput
          mt={10}
          placeholder="Paragraph category (example: Finance)"
          key={form.key("category")}
          {...form.getInputProps("category")}
        />
        <Button mt={15} loading={loading} type="submit">
          Create Knowledge
        </Button>
      </form>
    </Box>
  );
}

export default KnowledgeInput;
