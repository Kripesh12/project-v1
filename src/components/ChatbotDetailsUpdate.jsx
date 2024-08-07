import { Box, Button, Center, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import api from "../api";

function ChatbotDetailsUpdaate({ getChatbotDetails, closeModal }) {
  const [loading, setLoading] = useState(false);

  async function sendChatbotDetails() {
    setLoading(true);
    try {
      const res = await api.patch(
        "/api",
        {
          domain: form.getValues().domain,
          chatbot_name: form.getValues().chatbotName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      getChatbotDetails();
      closeModal();
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }
  const form = useForm({
    mode: "controlled",
    initialValues: {
      chatbotName: "",
      domain: "",
    },

    validate: {
      chatbotName: (value) => (value ? null : "Invalid Name"),
      domain: (value) =>
        /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)*[a-zA-Z]{2,63}$/.test(value)
          ? null
          : "Invalid Domain",
    },
  });

  return (
    <Center>
      <Box w={820}>
        <Paper>
          <Paper>
            <form onSubmit={form.onSubmit(sendChatbotDetails)}>
              <TextInput
                size="lg"
                labelProps={{ mb: "8px" }}
                withAsterisk
                label="Chatbot Name"
                placeholder="Chatbot"
                key={form.key("chatbotName")}
                {...form.getInputProps("chatbotName")}
              />
              <TextInput
                mt={20}
                size="lg"
                labelProps={{ mb: "8px" }}
                withAsterisk
                label="Domain"
                placeholder="example.com"
                key={form.key("domain")}
                {...form.getInputProps("domain")}
              />
              <Button type="submit" mt={20} size="md" loading={loading}>
                Update
              </Button>
            </form>
          </Paper>
        </Paper>
      </Box>
    </Center>
  );
}

export default ChatbotDetailsUpdaate;
