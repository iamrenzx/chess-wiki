import { Card, Skeleton, Stack } from "@mantine/core";

const SkeletonCard = () => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Stack>
      <Skeleton height={100} radius="md" />
    </Stack>
  </Card>
);

export default SkeletonCard;
