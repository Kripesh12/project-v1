import { Box, Button, Center, Paper, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import api from "../api";

function ChatBotDetailsForm({ getChatbotDetails }) {
  const [loading, setLoading] = useState(false);

  //Send chatbot details
  async function sendChatbotDetails() {
    setLoading(true);
    try {
      const res = await api.post(
        "/api/generate",
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
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  //UseForm
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
    <Center mt={50}>
      <Box w={820}>
        <Title size={20} align="center" c={"#323232"}>
          Enter Chatbot details
        </Title>
        <Paper mt={20}>
          <Paper withBorder={true} p={20} shadow="md">
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
                Submit
              </Button>
            </form>
          </Paper>
        </Paper>
      </Box>
    </Center>
  );
}

export default ChatBotDetailsForm;
