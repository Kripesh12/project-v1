import { Box, Paper, Image, Button, Modal } from "@mantine/core";
import AvatarInput from "./AvatarInput";
import { useDisclosure } from "@mantine/hooks";
function AvatarImageContainer({ image, status }) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleUploadSuccess = () => {
    close();
  };

  return (
    <Box>
      <Paper w={200} mt={30}>
        <Image src={`http://${image}` || "https://via.placeholder.com/150"} />
      </Paper>
      <Modal opened={opened} onClose={close} title="Change Avatar">
        <AvatarInput onUploadSuccess={handleUploadSuccess} />
      </Modal>
      <Button mt={10} onClick={open}>
        Change Avatar
      </Button>
    </Box>
  );
}

export default AvatarImageContainer;
