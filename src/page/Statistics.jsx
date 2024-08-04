import {
  Card,
  Box,
  Center,
  Title,
  Table,
  Pagination,
  Image,
} from "@mantine/core";
import classes from "./Statistics.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

//Global Variables
const PAGE_SIZE = 5;

export default function Statistics() {
  //Get user Demographic details on first mount
  const [countriesDetail, setCountriesDetail] = useState([]);
  useEffect(() => {
    async function getDemography() {
      try {
        const userId = localStorage.getItem("userId");
        const data = await api.get(`/enquiry/get-country/${userId}`);
        setCountriesDetail(data.data);
      } catch (e) {
        toast.error(`Cannot fetch count : ${e.message}`);
      }
    }
    getDemography();
  }, []);

  function aggregatedData(data) {
    const countryMap = new Map();
    data.forEach(({ id, country, flag }) => {
      if (countryMap.has(country)) {
        const entry = countryMap.get(country);
        entry.count += 1;
      } else {
        countryMap.set(country, { id, country, count: 1, flag });
      }
    });
    const aggregadtedData = Array.from(countryMap.values());
    return aggregadtedData;
  }

  function DemographyTable() {
    const [activePage, setActivePage] = useState(1);
    const startIndex = (activePage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const aggregatedCountryData = aggregatedData(countriesDetail);
    const paginatedData = aggregatedCountryData.slice(startIndex, endIndex);

    const rows = paginatedData.map((element) => (
      <Table.Tr key={element.id}>
        <Table.Td>{element.country}</Table.Td>
        <Table.Td>{element.count}</Table.Td>
        <Table.Td>
          <Image src={element.flag} w={25}></Image>
        </Table.Td>
      </Table.Tr>
    ));

    return (
      <>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Country</Table.Th>
              <Table.Th>Count</Table.Th>
              <Table.Th>Flag</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Pagination
          value={activePage}
          total={Math.ceil(aggregatedCountryData.length / PAGE_SIZE)}
          onChange={setActivePage}
          mt={30}
        />
      </>
    );
  }

  return (
    <Center>
      <Box w={720} mt={50} p={20}>
        <Title order={3} mb={20} c={"#383838"}>
          User Demography
        </Title>
        <Card
          withBorder
          radius="md"
          p="xl"
          className={classes.card}
          shadow="sm"
        >
          <DemographyTable />
        </Card>
      </Box>
    </Center>
  );
}
