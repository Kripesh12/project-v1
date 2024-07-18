import {
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Anchor,
} from "@mantine/core";
import classes from "./PasswordReset.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

export default function PasswordReset() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, settLoading] = useState(false);
  const form = useForm({
    validate: {
      newPassword: (value) =>
        value.length < 6 ? "Password must be atleast 6 character long" : null,
      confirmPassword: (value, values) =>
        value !== values.newPassword ? "Password didnot match" : null,
    },
  });
  async function handelSubmit() {
    try {
      settLoading(true);
      const data = await api.post(`/reset-password/${token}`, {
        newPassword: form.getValues().newPassword,
      });
      UpdateToken(data.data.token);
      navigate("/login");
      toast.success("Password Reset Sucessfully");
    } catch (e) {
      toast.error(e.message);
    } finally {
      settLoading(false);
    }
  }
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Password Reset
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handelSubmit)}>
          <PasswordInput
            label="New Password"
            placeholder="password"
            key={form.key("newPassword")}
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            label="Reenter Password"
            placeholder="reenter password"
            mt="md"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={loading}
            onClick={handelSubmit}
          >
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
