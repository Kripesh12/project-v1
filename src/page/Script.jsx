import { Box, Button, Center, Paper, Text, Title } from "@mantine/core";
import { CopyButton } from "@mantine/core";
import { toast } from "react-toastify";

export default function Script() {
  const text = `<script src=""></script>`;

  return (
    <Center>
      <Box mt={50} w={720}>
        <Title size={20} c={"dark"}>
          {localStorage.getItem("userId")
            ? "Copy this code and paste it at the end of your HTML code"
            : "No knowledge exists. Please create some knowledge"}
        </Title>
        <Paper withBorder={true} p={20} shadow="md" mt={20} mb={20}>
          <Text>{text}</Text>
        </Paper>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText("This is a simple text");
            toast.success("Copied to clipboard");
          }}
        >
          Copy Script
        </Button>
      </Box>
    </Center>
  );
}
