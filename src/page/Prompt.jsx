import {
  Paper,
  Input,
  Box,
  Title,
  Group,
  Button,
  Textarea,
  Center,
} from "@mantine/core";

function Prompt() {
  return (
    <Center>
      <Box w={820}>
        <Paper>
          <Title order={3} mb={20} c={"#383838"}>
            Enter your prompt
          </Title>
          <Textarea size="md" mb={10} />
          <Group>
            <Button>Search</Button>
            <Button bg={"red"}>Clear</Button>
          </Group>
        </Paper>

        <Paper mt={100} bg={"#aeddf8"} h={100}></Paper>
      </Box>
    </Center>
  );
}

export default Prompt;
