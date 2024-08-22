import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from "./ForgetPasswordPage.module.css";
import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  async function handleSubmit() {
    try {
      setLoading(true);
      await api.post("/auth/forgot-password", {
        email: form.getValues().email,
      });
      toast.success("Reset email send");
      form.reset();
    } catch (e) {
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            labelProps={{ mb: "8px" }}
            placeholder="you@mantine.dev"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Button
            className={classes.control}
            loading={loading}
            mt={10}
            type="submit"
          >
            Reset password
          </Button>
        </form>
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <IconArrowLeft
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
              <Box ml={5} onClick={() => navigate("/login")}>
                Back to the login page
              </Box>
            </Center>
          </Anchor>
        </Group>
      </Paper>
    </Container>
  );
}
