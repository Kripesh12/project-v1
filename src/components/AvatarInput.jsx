import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AvatarInput({ onUploadSuccess, ...props }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { mutate, isSuccess } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["info"],
        refetchType: "active",
        exact: true,
      });
    },
  });

  if (isSuccess) onUploadSuccess();
  async function handleSubmit(files) {
    setLoading(true);
    try {
      const file = files[0];
      const res = await api.patch(
        "/users/upload",
        {
          file,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Avatar uploaded");
      console.log(file);
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dropzone
      onDrop={(files) => mutate(files)}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
      multiple={false}
      loading={loading}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
