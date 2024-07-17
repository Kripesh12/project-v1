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

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    try {
      await api.post("/forgot-password", { email: email });
      toast.success("Reset email send");
    } catch (e) {
      toast.error(e.message);
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
        <TextInput
          label="Your email"
          placeholder="me@mantine.dev"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
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
          <Button className={classes.control} onClick={handleSubmit}>
            Reset password
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
