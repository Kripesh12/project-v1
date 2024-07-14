import {
  Box,
  Button,
  Flex,
  Input,
  Paper,
  PasswordInput,
  Space,
} from "@mantine/core";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function SigninPage() {
  return (
    <>
      <Flex justify="center" align="center" h={"100vh"}>
        <Paper
          px="md"
          py="lg"
          w={{ xl: 350, sm: 200 }}
          c="#0000"
          shadow="sm"
          withBorder
        >
          <Input placeholder="Your email" leftSection={<MdEmail />} />
          <Space h="md" />
          <PasswordInput
            type="password"
            placeholder="Your password"
            leftSection={<RiLockPasswordFill />}
          />
          <Space h="md" />
          <Button>Sign Up</Button>
        </Paper>
      </Flex>
    </>
  );
}

export default SigninPage;
