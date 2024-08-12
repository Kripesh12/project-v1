import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";

import { MdFeedback, MdAnalytics } from "react-icons/md";
import { RiRobotFill } from "react-icons/ri";
import { BiSolidCustomize } from "react-icons/bi";
import { FaFireAlt } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";

import { FaClock } from "react-icons/fa";

import classes from "./Features.module.css";

const mockdata = [
  {
    title: "AI-Powered Conversations",
    description:
      "Our chatbot uses advanced AI algorithms to understand and respond to customer queries efficiently, simulating natural conversations.",
    icon: RiRobotFill,
  },
  {
    title: "Pre-Fed Knowledge",
    description:
      "Feed the chatbot with your product knowledge, FAQs, and more. The chatbot uses this data to deliver relevant and consistent responses.",
    icon: MdFeedback,
  },
  {
    title: "24/7 Availability",
    description:
      "Never miss a customer query. MasterResponse is always available, providing support round-the-clock",
    icon: FaClock,
  },
  {
    title: "Customizable & Scalable",
    description:
      " Tailor the chatbot to reflect your brand’s voice and scale as your business grows.",
    icon: BiSolidCustomize,
  },
  {
    title: "Real-Time Learning",
    description:
      "Continuously adapts to new information and customer interactions, improving its accuracy and relevance over time without requiring manual updates.",
    icon: FaFireAlt,
  },
  {
    title: "Analytics & Insights",
    description:
      "Gain insights into customer behavior and preferences through detailed reports and analytics.",
    icon: MdAnalytics,
  },
];

export function Features() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size={1200} py="xl" pt={100} pb={100} id="features">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Why choose Master response?
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Our AI-powered chatbot interacts with your customers using a rich
        repository of pre-fed knowledge, ensuring they get the answers they
        need, when they need them.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
