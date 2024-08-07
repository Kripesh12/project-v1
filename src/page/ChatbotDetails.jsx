import { Box, Button, Center, Modal, Paper, Text, Title } from "@mantine/core";
import AvatarInput from "../components/AvatarInput";
import AvatarImageContainer from "../components/AvatarImageContainer";
import api from "../api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ChatbotDetailsUpdaate from "../components/ChatbotDetailsUpdate";
import ChatBotDetailsForm from "../components/ChatBotDetailsForm";

export default function ChatbotDetails() {
  const [initData, setInitData] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  //Fetch the chatbot details
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
      setInitData(res.data);
      console.log(initData);
    } catch (e) {
      console.log(e.message);
    }
  }
  //UseEffect to fetch data
  useEffect(() => {
    getChatbotDetails();
  }, []);

  const { isLoading, data, status } = useQuery({
    queryKey: ["info"],
    queryFn: getAvatar,
  });

  //Get the avatar for the chatbot
  async function getAvatar() {
    const data = await api.post(
      "/auth/get-info",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data.data.avatar;
  }
  if (isLoading) {
    return (
      <>
        <br />
        <br />
        Loading...
      </>
    );
  }
  return (
    <>
      <Center>
        <Box mt={50} w={820}>
          <Title size={20} c={"dark"} mb={30} align="center">
            Upload avatar for your chatbot
          </Title>{" "}
          {data ? (
            <AvatarImageContainer image={data} status={status} />
          ) : (
            <AvatarInput />
          )}
        </Box>
      </Center>

      {initData ? (
        <Center>
          <Box w={820} mt={80}>
            <Title size={22} align="center" c={"#383838"}>
              Chatbot details
            </Title>

            <Paper shadow="md" p={20} mt={20} withBorder={true}>
              <Title size={28} c={"#383838"}>
                {initData.chatbot_name}
              </Title>
              <Text c={"#3a3a3a"} mt={15}>
                {initData.domain}
              </Text>
              <Modal
                opened={opened}
                onClose={close}
                title="Update Chatbot Details"
              >
                <ChatbotDetailsUpdaate
                  getChatbotDetails={getChatbotDetails}
                  closeModal={close}
                />
              </Modal>
              <Button mt={20} onClick={open}>
                Edit
              </Button>
            </Paper>
          </Box>
        </Center>
      ) : (
        <ChatBotDetailsForm getChatbotDetails={getChatbotDetails} />
      )}
    </>
  );
}
