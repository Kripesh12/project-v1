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
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      tos: (value) => (value ? null : "Need to accept terms and condition"),
    },
  });

  async function handelConfirmEmail() {
    const userData = {
      email: form.getValues().email,
    };
    try {
      setIsloading(true);
      await api.post("/auth/get-verify", userData);
      toast.success("Confirmation email sent");
      form.reset();
    } catch (e) {
      toast.error(e.response.data.message);
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
        <form onSubmit={form.onSubmit(handelConfirmEmail)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="I agree to the terms and condition"
              key={form.key("termsOfService")}
              {...form.getInputProps("tos", { type: "checkbox" })}
            />
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Confirm Email
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
