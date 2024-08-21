import React from "react";
import {
  Group,
  Text,
  Button,
  Container,
  Box,
  Anchor,
  Burger,
  Drawer,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

export default function NavbarSection() {
  const navigate = useNavigate();
  const [burgerOpen, { toggle, close }] = useDisclosure(false);
  return (
    <Box
      height={60}
      px="md"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "white",
      }}
    >
      <Container size={1200} p={"sm"}>
        <Group position="apart" align="center" justify="space-between">
          <Text weight={700} size="lg">
            Masteresponse
          </Text>

          <Group gap={25} visibleFrom="sm">
            <Anchor href="#Home" size="lg">
              Home
            </Anchor>
            <Anchor href="#about" size="lg">
              About
            </Anchor>
            <Anchor href="#features" size="lg">
              Features
            </Anchor>
            <Anchor href="#faqs" size="lg">
              FAQs
            </Anchor>
            <Anchor href="#contact" size="lg">
              Contact
            </Anchor>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </Group>
          <Burger opened={burgerOpen} onClick={toggle} hiddenFrom="sm" />
          <Drawer opened={burgerOpen} onClose={close} position="right">
            <Stack gap={30} align="center">
              <Anchor href="#Home" size="lg" onClick={toggle}>
                Home
              </Anchor>
              <Anchor href="#about" size="lg" onClick={toggle}>
                About
              </Anchor>
              <Anchor href="#features" size="lg" onClick={toggle}>
                Features
              </Anchor>
              <Anchor href="#faqs" size="lg" onClick={toggle}>
                FAQs
              </Anchor>
              <Anchor href="#contact" size="lg">
                Contact
              </Anchor>
              <Group>
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")}>Sign Up</Button>
              </Group>
            </Stack>
          </Drawer>
        </Group>
      </Container>
    </Box>
  );
}
