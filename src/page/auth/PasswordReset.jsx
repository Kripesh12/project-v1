import {
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Anchor,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import classes from "./PasswordReset.module.css";

export default function PasswordReset() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      newPassword: (value) =>
        value.length < 6 ? "Password must be at least 6 characters long" : null,
      confirmPassword: (value, values) =>
        value !== values.newPassword ? "Passwords do not match" : null,
    },
  });

  async function handleSubmit(values) {
    try {
      setLoading(true);
      await api.post(
        `/auth/reset-password`,
        {
          password: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Password Reset
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PasswordInput
            label="New Password"
            placeholder="Password"
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            label="Reenter Password"
            placeholder="Reenter password"
            mt="md"
            {...form.getInputProps("confirmPassword")}
          />
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Reset Password
          </Button>
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate("/login")}
          >
            Go back to login
          </Anchor>
        </form>
      </Paper>
    </Container>
  );
}
