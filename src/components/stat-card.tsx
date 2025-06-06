import { Grid, Card, Text, Group, ThemeIcon } from "@mantine/core";

const StatCard = ({
  icon,
  color,
  label,
  value,
  monospace = false,
}: {
  icon: React.ReactNode;
  color: string;
  label: string;
  value: string;
  monospace?: boolean;
}) => (
  <Grid.Col span={{ base: 12, md: 6 }}>
    <Card withBorder radius="md" p="md" bg={`${color}.0`}>
      <Group gap="sm">
        <ThemeIcon color={color} variant="light" size="lg">
          {icon}
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed" fw={500}>
            {label}
          </Text>
          <Text
            size="lg"
            fw={600}
            style={{ fontFamily: monospace ? "monospace" : undefined }}
          >
            {value}
          </Text>
        </div>
      </Group>
    </Card>
  </Grid.Col>
);

export default StatCard;
