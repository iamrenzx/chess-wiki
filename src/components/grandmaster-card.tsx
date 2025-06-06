import { Button, Card, Group, Text, Avatar, Tooltip } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  name: string;
};

const GrandmasterCard = ({ name }: Props) => {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate({ to: "/user/$username", params: { username: name } });
  };

  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder>
      <Group align="center" mb="md" wrap="nowrap">
        <Avatar color="green" radius="xl">
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <Tooltip label={name} position="top">
          <Text fw={600} size="lg" truncate="end" style={{ flex: 1 }}>
            {name}
          </Text>
        </Tooltip>
      </Group>

      <Group justify="center" mt="md">
        <Button
          variant="light"
          color="green"
          size="sm"
          onClick={handleProfile}
          fullWidth
        >
          View Profile
        </Button>
      </Group>
    </Card>
  );
};

export default GrandmasterCard;
