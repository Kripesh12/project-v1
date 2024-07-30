import { Title, Box, Card, Center, Table, Pagination } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { useState } from "react";

const data = [
  { date: "Jan", leads: 200 },
  { date: "Feb", leads: 100 },
  { date: "Mar", leads: 500 },
  { date: "Apr", leads: 700 },
  { date: "May", leads: 400 },
  { date: "Jun", leads: 900 },
  { date: "Jul", leads: 200 },
  { date: "Aug", leads: 220 },
  { date: "Sep", leads: 250 },
  { date: "Oct", leads: 270 },
  { date: "Nov", leads: 90 },
  { date: "Dec", leads: 1200 },
];

const leadsData = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" },
  { name: "Michael Johnson", email: "michael.johnson@example.com" },
  { name: "Emily Davis", email: "emily.davis@example.com" },
  { name: "Robert Brown", email: "robert.brown@example.com" },
  { name: "Jessica Taylor", email: "jessica.taylor@example.com" },
  { name: "Daniel Wilson", email: "daniel.wilson@example.com" },
  { name: "Sarah Moore", email: "sarah.moore@example.com" },
  { name: "David Lee", email: "david.lee@example.com" },
  { name: "Laura White", email: "laura.white@example.com" },
  { name: "Christopher Harris", email: "christopher.harris@example.com" },
  { name: "Amanda Martin", email: "amanda.martin@example.com" },
  { name: "James Thompson", email: "james.thompson@example.com" },
  { name: "Karen Clark", email: "karen.clark@example.com" },
];

const PAGE_SIZE = 6;

function Chart() {
  return (
    <LineChart
      h={300}
      data={data}
      series={[{ name: "leads", label: "Avg. Leads" }]}
      dataKey="date"
      type="solid"
      strokeWidth={5}
      curveType="natural"
    />
  );
}

function LeadTable() {
  const [activePage, setActivePage] = useState(1);
  const startIndex = (activePage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedData = leadsData.slice(startIndex, endIndex);

  const rows = paginatedData.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User Name</Table.Th>
            <Table.Th>Email</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Pagination
          value={activePage}
          total={Math.ceil(leadsData.length / PAGE_SIZE)}
          onChange={setActivePage}
          mt={30}
        />
      </Table>
    </>
  );
}

export default function UserLeads() {
  return (
    <Center>
      <Box w={720} mt={50} p={20}>
        <Title order={3} mb={20} c={"#383838"}>
          Leads in one year
        </Title>
        <Card withBorder radius="md" p="xl" shadow="sm">
          <Chart />
        </Card>
        <Card withBorder radius="md" p="xl" shadow="sm" mt={40}>
          <LeadTable />
        </Card>
      </Box>
    </Center>
  );
}
