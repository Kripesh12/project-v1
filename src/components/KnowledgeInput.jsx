import {
  Box,
  Button,
  Center,
  FileInput,
  Input,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import api from "../api";
import { useForm } from "@mantine/form";
import { MdPictureAsPdf } from "react-icons/md";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function KnowledgeInput() {
  const queryClient = useQueryClient();
  const [knowledgeFile, setKnowledgeFile] = useState(null);
  //UseForm
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      paragraph: "",
      category: "",
    },
    validate: {
      paragraph: (value) =>
        knowledgeFile || /^(?!\s*$).+/.test(value)
          ? null
          : "Paragraph cannot be empty",
      category: (value) =>
        /^(?!\s*$).+/.test(value) ? null : "Category cannot be empty",
    },
  });

  //Function to handle knowledge file selection
  function handleFileChange(selectedFile) {
    setKnowledgeFile(selectedFile);
  }

  async function createKnowledge() {
    await api.post(
      "/knowledge/create",
      {
        file: knowledgeFile,
        userId: localStorage.getItem("userId"),
        paragraph: form.getValues().paragraph,
        category: form.getValues().category,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    form.reset();
    setKnowledgeFile(null);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: createKnowledge,
    onSuccess: () => {
      toast.success("Knowledge Created");
      queryClient.invalidateQueries(["knowledge"]);
      form.reset();
      setKnowledgeFile(null);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit(mutate)}>
        <Textarea
          disabled={knowledgeFile}
          label="Knowledge"
          labelProps={{ mb: "5px" }}
          autosize
          minRows={5}
          maxRows={7}
          placeholder="Type here..."
          key={form.key("paragraph")}
          {...form.getInputProps("paragraph")}
        />
        <Center>
          <Text m={5}>or</Text>
        </Center>

        <FileInput
          onChange={handleFileChange}
          label="Upload a pdf file"
          accept="application/pdf"
          labelProps={{ mb: "5px" }}
          value={knowledgeFile}
          leftSection={<MdPictureAsPdf color="#0b80ec" size={20} />}
          placeholder="Upload a knowledge pdf file"
        ></FileInput>

        <TextInput
          label="Category"
          labelProps={{ mb: "5px" }}
          mt={10}
          placeholder="Paragraph category (example: Finance)"
          key={form.key("category")}
          {...form.getInputProps("category")}
        />

        <Button mt={15} loading={isPending} type="submit">
          Create Knowledge
        </Button>
      </form>
    </Box>
  );
}

export default KnowledgeInput;
