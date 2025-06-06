// components/skeletons/ProfileSkeleton.tsx
import {
  Container,
  Paper,
  Skeleton,
  Group,
  Stack,
  Flex,
  Grid,
  Card,
  Box,
} from "@mantine/core";

const StatCardSkeleton = () => (
  <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
    <Card withBorder radius="md" p="md">
      <Group justify="space-between">
        <Stack gap="xs">
          <Skeleton height={14} width={80} />
          <Skeleton height={20} width={60} />
        </Stack>
        <Skeleton height={24} width={24} radius="sm" />
      </Group>
    </Card>
  </Grid.Col>
);

const InfoRowSkeleton = () => (
  <Group justify="space-between" align="center">
    <Skeleton height={16} width={120} />
    <Skeleton height={24} width={80} radius="sm" />
  </Group>
);

export const ProfileSkeleton = () => {
  return (
    <Container size="md" py="xl">
      <Paper shadow="lg" radius="lg" p="xl" withBorder>
        {/* Header Section */}
        <Flex
          mb="xl"
          justify={{ base: "center", md: "flex-start" }}
          align="center"
          gap="md"
          wrap="wrap"
        >
          <Group w={{ base: "100%", md: "auto" }}>
            <Skeleton height={120} width={120} radius="lg" />
          </Group>

          <Stack
            justify="center"
            w={{ base: "100%", md: "auto" }}
            gap="sm"
            style={{ flex: 1 }}
          >
            <Group align="center" gap="sm">
              <Skeleton height={32} width={200} />
              <Skeleton height={28} width={80} radius="sm" />
              <Skeleton height={24} width={70} radius="sm" />
            </Group>

            <Group gap="xs">
              <Skeleton height={20} width={150} />
              <Skeleton height={22} width={100} radius="sm" />
            </Group>

            <Group gap="md">
              <Skeleton height={36} width={36} radius="sm" />
              <Group gap="xs">
                <Skeleton height={20} width={20} />
                <Skeleton height={16} width={120} />
              </Group>
            </Group>
          </Stack>

          <Skeleton height={36} width={140} radius="sm" />
        </Flex>

        {/* Divider */}
        <Box
          mb="xl"
          style={{ height: 1, backgroundColor: "var(--mantine-color-gray-3)" }}
        />

        {/* Stats Grid */}
        <Grid mb="xl">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </Grid>

        {/* Profile Information Card */}
        <Card withBorder radius="md" p="lg" bg="gray.0">
          <Skeleton height={24} width={180} mb="md" />
          <Stack gap="md">
            <InfoRowSkeleton />
            <InfoRowSkeleton />
            <InfoRowSkeleton />
            <InfoRowSkeleton />
          </Stack>
        </Card>

        {/* Footer */}
        <Box
          mt="xl"
          pt="md"
          style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}
        >
          <Skeleton height={14} width={300} mx="auto" />
        </Box>
      </Paper>
    </Container>
  );
};
