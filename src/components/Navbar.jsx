import React from "react";
import {
  Group,
  Text,
  Button,
  Container,
  Box,
  Flex,
  Anchor,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function NavbarSection() {
  const navigate = useNavigate();
  return (
    <Box height={60} px="md">
      <Container size={1200} p={"sm"}>
        <Group position="apart" align="center" justify="space-between">
          <Text weight={700} size="lg">
            Masteresponse
          </Text>

          <Group gap={35}>
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

          <Group>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
