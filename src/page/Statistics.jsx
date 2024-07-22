import { Text, Progress, Card, Box, Center } from "@mantine/core";
import classes from "./Statistics.module.css";

export default function Statistics() {
  return (
    <Center>
      <Box maw={720}>
        <Card withBorder radius="md" p="xl" className={classes.card} w={"720"}>
          <Text fz="xs" tt="uppercase" fw={700} className={classes.title}>
            NO OF SEARCHES
          </Text>
          <Text fz="lg" fw={500} className={classes.stats}>
            $5.431 / $10.000
          </Text>
          <Progress
            value={33}
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
    </Center>
  );
}
