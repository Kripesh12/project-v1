import {
  Title,
  Text,
  Button,
  Container,
  Box,
  Flex,
  Overlay,
} from "@mantine/core";
import classes from "./Hero.module.css";

export default function Hero() {
  return (
    <Container className={classes.wrapper} size={"100%"} id="Home">
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Box className={classes.inner} mt={-100}>
        <Title
          className={classes.title}
          fz={"52px"}
          c={"#e9e9e9"}
          lh={1.2}
          w={820}
        >
          Your Intelligent {""}
          <span className={classes.highlight}>AI-Powered Customer</span>{" "}
          Interaction Solution
        </Title>

        <Container p={0} size={600} mt={28}>
          <Text size="lg" className={classes.description} c={"#ffff"}>
            In today’s fast-paced digital world, customer experience is
            paramount. MasterResponse Chatbot is designed to elevate your
            customer support by providing instant, accurate, and reliable
            responses.
          </Text>
        </Container>

        <Box className={classes.controls} mt={50}>
          <Button className={classes.control} size="xl">
            Free signup
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
