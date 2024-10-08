import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { UserContext } from "../../App";

export default function LoginPage() {
  const user = useContext(UserContext);
  const { UpdateToken } = user;
  const navigate = useNavigate();
  const [loading, settLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be atleast 6 character long" : null,
    },
  });
  async function handelSubmit() {
    try {
      settLoading(true);
      const data = await api.post("/auth/login", form.getValues());
      UpdateToken(data.data.token);
      navigate("/dashboard/prompt");
      toast.success("Login Sucessfully");
    } catch (e) {
      if (e.response) {
        toast.error(e.response.data.message);
      } else if (e.request) {
        toast.error("Network error, please try again.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      settLoading(false);
    }
  }
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("/signup")}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handelSubmit)}>
          <TextInput
            label="Email"
            labelProps={{ mb: "8px" }}
            placeholder="you@mantine.dev"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            labelProps={{ mb: "8px" }}
            placeholder="Your password"
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor
              component="button"
              size="sm"
              onClick={() => navigate("/forget")}
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
