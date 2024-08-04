import {
  Box,
  Button,
  Center,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
function Key() {
  const [apiKey, setApiKey] = useState("");
  const [domainName, setDomainName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      async function getDomain() {
        const { data } = await api.get("/api/get-api", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(data);
        setDomainName(data.domain);
        setApiKey(data.API_key);
      }
      getDomain();
    } catch (e) {
      toast.error(e.message);
      console.log(e.message);
    }
  }, []);
  async function getApi() {
    setLoading(true);
    try {
      const { data } = await api.post(
        "/api/generate",
        {
          domain: form.getValues().domain,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      setApiKey(data.API_key);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      domain: "",
    },

    validate: {
      domain: (value) =>
        /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)*[a-zA-Z]{2,63}$/.test(value)
          ? null
          : "Invalid Domain",
    },
  });
  return (
    <Center>
      <Box w={820} mt={30}>
        <Paper>
          <Title order={3} mb={20} c={"#383838"}>
            Generate your script tag
          </Title>
          <form onSubmit={form.onSubmit(getApi)}>
            <TextInput
              size="lg"
              labelProps={{ mb: "8px" }}
              withAsterisk
              label="Domain"
              placeholder="example.com"
              key={form.key("domain")}
              {...form.getInputProps("domain")}
            />
            <Button type="submit" mt={10} size="md" loading={loading}>
              Generate
            </Button>
          </form>
          <Paper bg={"#ffffff"} mt={30} shadow="md" withBorder={true} p={20}>
            <Text>
              {apiKey
                ? `<script src="/src/main.jsx?key=${apiKey}"></script>`
                : "API key doesnot exist"}
            </Text>
          </Paper>
          <Text mt={10} ml={10}>
            Status: Active
          </Text>
        </Paper>
      </Box>
    </Center>
  );
}

export default Key;
