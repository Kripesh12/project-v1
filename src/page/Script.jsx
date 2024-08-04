import { Box, Center, Title } from "@mantine/core";
import AvatarInput from "../components/AvatarInput";
import AvatarImageContainer from "../components/AvatarImageContainer";
import api from "../api";
import { useQuery } from "@tanstack/react-query";
import Key from "./Key";

export default function Script() {
  const text = `<script src=""></script>`;

  const { isLoading, data, error, status } = useQuery({
    queryKey: ["info"],
    queryFn: getAvatar,
  });

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
  console.log(data);
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
          <Title size={20} c={"dark"}>
            Upload avatar for your chatbot
          </Title>{" "}
          {data ? (
            <AvatarImageContainer image={data} status={status} />
          ) : (
            <AvatarInput />
          )}
        </Box>
      </Center>

      <Key />
    </>
  );
}
