import { Box, Center, Paper, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function Script() {
  const [apiKey, setApiKey] = useState("");
  const [domain, setDomain] = useState("");

  async function getChatbotDetails() {
    try {
      const res = await api.post(
        "/api/get-info",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDomain(res.data.domain);
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
  }

  //Fetch the api key on mount
  useEffect(() => {
    async function getApi() {
      try {
        const res = await api.post(
          "/api/get-info",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setApiKey(res.data.api_key);
      } catch (e) {
        console.log(e.message);
      }
    }
    getApi();
    getChatbotDetails();
  }, []);

  return (
    <Center>
      <Box mt={100} w={820}>
        <Title fz={18} c={"#222222"}>
          Copy this script tag and paste it in your HTML
        </Title>

        <Paper shadow="xl" p={20} mt={10}>
          <Text fz={18}>
            {apiKey
              ? ` <script src="/src/main.jsx?key=${apiKey}"></script>`
              : "API key not defined : Generate API key by filling chatbot details"}
          </Text>
        </Paper>
        <Box mt={20}>
          {domain ? (
            <Text>
              * This script tag only works on {domain}.
              <Link style={{ color: "blue" }} to="/dashboard/details">
                {" "}
                Edit your domain here
              </Link>
            </Text>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Center>
  );
}

export default Script;
