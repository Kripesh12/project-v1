import cx from "clsx";
import { Title, Text, Container, Button, Overlay } from "@mantine/core";
import classes from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const navigator = useNavigate();
  return (
    <div className={classes.wrapper}>
      <div>
        <Overlay color="#000" opacity={0.65} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Automated AI chat bot for{" "}
            <Text component="span" inherit c={"blue"}>
              your company
            </Text>
          </Title>

          <Container size={640} mt={40}>
            <Text size="lg" className={classes.description} c={"#FFFF"}>
              Build better customer experiences with our AI chatbot. It’s
              designed to understand and respond to user queries effectively,
              ensuring seamless and engaging interactions.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button
              className={cx(classes.control, classes.secondaryControl)}
              size="xl"
              onClick={() => navigator("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
