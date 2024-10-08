import { Box, Flex, Title } from "@mantine/core";
import Knowledge from "./Knowledge";

function KnowledgeContainer({ data }) {
  return (
    <Box mt={35}>
      <Title order={4} mb={20} c={"#5e5e5e"}>
        Your existing paragraph
      </Title>
      <Flex direction={"column"} gap={25}>
        {data.map((item) => (
          <Knowledge key={item.id} data={item} />
        ))}
      </Flex>
    </Box>
  );
}

export default KnowledgeContainer;
