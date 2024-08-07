import { Box, Paper, Image, Button, Modal, Avatar, Flex } from "@mantine/core";
import AvatarInput from "./AvatarInput";
import { useDisclosure } from "@mantine/hooks";
function AvatarImageContainer({ image, status }) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleUploadSuccess = () => {
    close();
  };

  return (
    <Box>
      <Flex direction={"column"} justify={"center"} align={"center"} gap={20}>
        <Avatar
          src={`http://${image}` || "https://via.placeholder.com/150"}
          size={200}
          autoContrast={true}
        />

        <Modal opened={opened} onClose={close} title="Change Avatar">
          <AvatarInput onUploadSuccess={handleUploadSuccess} />
        </Modal>
        <Button mt={10} onClick={open}>
          Change Avatar
        </Button>
      </Flex>
    </Box>
  );
}

export default AvatarImageContainer;
