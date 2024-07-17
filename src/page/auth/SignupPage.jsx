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
import classes from "./SignupPage.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setIsloading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      tos: false,
      confirmPassword: "",
    },
    validate: {
      name: (value) => (value.length < 2 ? "Name must have two letters" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6
          ? "Password must be of atleast 6 characters"
          : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              value
            )
          ? null
          : "Password must have atleast one uppercase, one lowercase, one letter and one special symbol",
      tos: (value) => (value ? null : "Need to accept terms and condition"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Password didnot match" : null,
    },
  });

  async function handelCreateUser() {
    const userData = {
      name: form.getValues().name,
      email: form.getValues().email,
      password: form.getValues().password,
    };
    try {
      setIsloading(true);
      await api.post("/create-user", userData);
      navigate("/login");
      toast.success("Signup Sucessfully");
    } catch (e) {
      toast.error(e.message);
      throw e;
    } finally {
      setIsloading(false);
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Create an account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component="button" onClick={() => navigate("/login")}>
          Sign In
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handelCreateUser)}>
          <TextInput
            label="Name"
            placeholder="Jhon Doe"
            mb="md"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Email"
            placeholder="you@example.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Your password"
            mt="md"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />

          <Group justify="space-between" mt="lg">
            <Checkbox
              label="I agree to the terms and condition"
              key={form.key("termsOfService")}
              {...form.getInputProps("tos", { type: "checkbox" })}
            />
            <Anchor component="button" size="sm">
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
