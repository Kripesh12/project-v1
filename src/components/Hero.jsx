import cx from "clsx";
import { Title, Text, Container, Button, Group, Flex } from "@mantine/core";
import classes from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
import RobotAnimation from "../animation/RobotAnimation";
export default function Hero() {
  const navigator = useNavigate();
  return (
    <div className={classes.wrapper}>
      <Container size={1200} className={classes.inner}>
        <Flex align={"center"} justify={"space-between"} gap={80}>
          <Group w={"70%"}>
            <h1 className={classes.title}>
              A{" "}
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
                inherit
              >
                fully featured
              </Text>{" "}
              AI chatbot for your business
            </h1>

            <Text className={classes.description} c={"dimmed"} mt={20} fz={20}>
              Build fully functional accessible web applications with ease –
              Mantine includes more than 100 customizable components and hooks
              to cover you in any situation
            </Text>
          </Group>
          <Group>
            <RobotAnimation />
          </Group>
        </Flex>
        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
