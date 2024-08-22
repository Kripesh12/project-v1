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

const PAGE_SIZE = 6;

export default function UserLeads() {
  const [activePage, setActivePage] = useState(1);
  const startIndex = (activePage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  async function getUserLeads() {
    const userId = localStorage.getItem("userId");
    try {
      const data = await api.get(`/enquiry/${userId}`);
      console.log(data.data.length);
      return data.data;
    } catch (e) {
      console.log(e.message);
    }
  }

  const {
    data = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["userLeads"],
    queryFn: getUserLeads,
  });

  function getPaginatedData(userLeads, startIndex, endIndex) {
    if (!Array.isArray(userLeads)) {
      return [];
    }
    return userLeads.slice(startIndex, endIndex);
  }

  const paginatedData = getPaginatedData(data, startIndex, endIndex);

  const rows = paginatedData.map((element) => (
    <Table.Tr key={element.id || element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
    </Table.Tr>
  ));

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
          User Leads
        </Title>
        <Card withBorder radius="md" p="xl" shadow="sm" mt={20}>
          {data.length ? (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Users Questions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          ) : (
            "User has not created any leads"
          )}
          <Pagination
            value={activePage}
            total={Math.ceil(data.length || 1 / PAGE_SIZE)}
            onChange={setActivePage}
            mt={30}
          />
        </Card>
      </Box>
    </Center>
  );
}
