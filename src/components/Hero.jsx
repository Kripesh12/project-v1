import {
  Title,
  Text,
  Button,
  Container,
  Box,
  Overlay,
  Center,
} from "@mantine/core";
import classes from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

export default function Hero() {
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width: 500px)");
  return (
    <Container className={classes.wrapper} size={"100%"} id="Home">
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Box className={classes.inner} mt={-100} w={{ base: 920, sm: 600 }}>
        <Title className={classes.title} fz={"52px"} c={"#e9e9e9"} lh={1.2}>
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
        <Center mt={50}>
          <Button
            size="xl"
            onClick={() => navigate("/signup")}
            w={matches ? "90%" : ""}
          >
            Free signup
          </Button>
        </Center>
      </Box>
    </Container>
  );
}
