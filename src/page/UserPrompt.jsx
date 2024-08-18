import {
  Title,
  Box,
  Card,
  Center,
  Table,
  Pagination,
  Loader,
  Text,
} from "@mantine/core";
import { useState } from "react";
import api from "../api";
import { useQuery } from "@tanstack/react-query";

//GLOBAL VARIABLES
const PAGE_SIZE = 10;

export default function UserPrompt() {
  const [activePage, setActivePage] = useState(1);
  const startIndex = (activePage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  async function getUserPrompt() {
    const userId = localStorage.getItem("userId");
    const data = await api.get(`/knowledge/get-prompts/${userId}`);
    return data.data.prompts;
  }

  //UseQueries
  const {
    data: userPrompt = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["userPrompt"],
    queryFn: getUserPrompt,
  });

  function getPaginatedData(userPrompt, startIndex, endIndex) {
    if (!Array.isArray(userPrompt)) {
      return [];
    }
    return userPrompt.slice(startIndex, endIndex);
  }

  const paginatedData = getPaginatedData(userPrompt, startIndex, endIndex);

  const rows = paginatedData.map((prompt, index) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{prompt}</Table.Td>
      </Table.Tr>
    );
  });

  if (isPending) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" variant="bars" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center>
        <Text>Error in fetching the data : {error.message}</Text>
      </Center>
    );
  }

  return (
    <Center>
      <Box w={720} mt={50} p={20}>
        <Title order={3} mt={40} c={"#383838"}>
          User Prompt
        </Title>

        <Card withBorder radius="md" p="xl" shadow="sm" mt={20}>
          {userPrompt.length ? (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Users Questions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          ) : (
            "User has not created any prompt"
          )}

          <Pagination
            value={activePage}
            total={Math.ceil(userPrompt.length / PAGE_SIZE)}
            onChange={setActivePage}
            mt={30}
          />
        </Card>
      </Box>
    </Center>
  );
}
