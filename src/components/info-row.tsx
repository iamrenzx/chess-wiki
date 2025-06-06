import { Group, Text } from "@mantine/core";

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Group justify="space-between">
    <Text fw={500}>{label}</Text>
    {typeof value === "string" ? <Text c="dimmed">{value}</Text> : value}
  </Group>
);

export default InfoRow;
