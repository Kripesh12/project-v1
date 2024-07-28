import { Text, Progress, Card, Box, Center, Title, Flex } from "@mantine/core";
import classes from "./Statistics.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import StatsTable from "../components/StatsTable";

export default function Statistics() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function fetchCount() {
      try {
        const data = await api.post("/get-count", {
          email: localStorage.getItem("email"),
        });
        setCount(data.data.count);
      } catch (e) {
        toast.error(`Cannot fetch count : ${e.message}`);
      }
    }
    fetchCount();
  }, []);

  return (
    <Center>
      <Flex direction={"column"}>
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
            <StatsTable />
          </Card>
        </Box>

        {/* User Stats */}
        <Box w={720} mt={50} p={20}>
          <Title order={3} mb={20} c={"#383838"}>
            User Statistics
          </Title>
          <Card
            withBorder
            radius="md"
            p="xl"
            className={classes.card}
            shadow="sm"
          >
            <Text fz="xs" tt="uppercase" fw={700} className={classes.title}>
              NO OF SEARCHES
            </Text>
            <Text fz="lg" fw={500} className={classes.stats}>
              {count} / 100
            </Text>
            <Progress
              value={count}
              mt="md"
              size="lg"
              radius="xl"
              classNames={{
                root: classes.progressTrack,
                section: classes.progressSection,
              }}
            />
          </Card>
        </Box>
      </Flex>
    </Center>
  );
}
