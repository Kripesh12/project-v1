import { PasswordInput, Paper, Title, Container, Button } from "@mantine/core";
import classes from "./PasswordReset.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { UserContext } from "../../App";

export default function PasswordReset() {
  const user = useContext(UserContext);
  const { token, UpdateToken } = user;
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
      const data = await api.post("/login", form.getValues());
      UpdateToken(data.data.token);
      navigate("/dashboard");
      toast.success("Login Sucessfully");
    } catch (e) {
      console.log();
      if (e.response.status == 400) {
        toast.error("Incorrect login or password");
        return;
      }
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
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Reenter Password"
            placeholder="reenter password"
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Reset Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
