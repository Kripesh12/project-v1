import {
  Title,
  Box,
  Card,
  Center,
  Table,
  Pagination,
  camelToKebabCase,
} from "@mantine/core";
import { BarChart, LineChart } from "@mantine/charts";
import { useEffect, useState } from "react";
import api from "../api";

const PAGE_SIZE = 6;
//For Chart
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

export default function UserLeads() {
  const [userLeads, setUserLeads] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const startIndex = (activePage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  function getPaginatedData(userLeads, startIndex, endIndex) {
    if (!Array.isArray(userLeads)) {
      return [];
    }
    return userLeads.slice(startIndex, endIndex);
  }
  const paginatedData = getPaginatedData(userLeads, startIndex, endIndex);
  useEffect(() => {
    async function getUserLeads() {
      const userId = localStorage.getItem("userId");
      try {
        const data = await api.get(`/enquiry/${userId}`);
        setUserLeads(data.data);
        console.log(data);
      } catch (e) {
        console.log(e.message);
      }
    }
    getUserLeads();
  }, []);

  function aggregatedData(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }
    const leadsMap = new Map();
    data.forEach(({ month }) => {
      if (leadsMap.has(month)) {
        const entry = leadsMap.get(month);
        entry.leads += 1;
      } else {
        leadsMap.set(month, { month, leads: 1 });
      }
    });
    const aggregadtedData = Array.from(leadsMap.values());
    return aggregadtedData;
  }

  const newData = aggregatedData(userLeads);

  const rows = paginatedData.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Center>
      <Box w={720} mt={50} p={20}>
        <Title order={3} mb={20} c={"#383838"}>
          Leads in one year
        </Title>
        <Card withBorder radius="md" p="xl" shadow="sm">
          <BarChart
            h={300}
            w={200}
            data={aggregatedData(userLeads)}
            dataKey="month"
            series={[{ name: "leads", color: "blue.6" }]}
            tickLine="y"
          />
        </Card>
        <Title order={3} mt={40} c={"#383838"}>
          User Leads
        </Title>
        <Card withBorder radius="md" p="xl" shadow="sm" mt={20}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User Name</Table.Th>
                <Table.Th>Email</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          <Pagination
            value={activePage}
            total={Math.ceil(userLeads.length / PAGE_SIZE)}
            onChange={setActivePage}
            mt={30}
          />
        </Card>
      </Box>
    </Center>
  );
}
