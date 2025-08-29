import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconCalendar,
  IconChess,
  IconExternalLink,
  IconShield,
  IconStar,
  IconTrophy,
  IconUsers,
  IconVideo,
  IconVideoOff,
} from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { fetchCountry, fetchUser } from "../services/chess-api";
import { countryCodeToFlag } from "../utils/countryCodeToFlag";
import { getJoinDate } from "../utils/date";
import { getLeagueColor } from "../utils/leagueColor";
import ErrorFallback from "./error-fallback";
import InfoRow from "./info-row";
import LastOnline from "./last-online";
import { ProfileSkeleton } from "./skeletons/profile-skeleton";
import StatCard from "./stat-card";

const usePlayerData = (username: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchUser(username),
    enabled: !!username,
  });
};

const useCountryData = (countryUrl?: string) => {
  return useQuery({
    queryKey: ["country", countryUrl],
    queryFn: () => fetchCountry(countryUrl || ""),
    enabled: !!countryUrl,
  });
};

const Profile = () => {
  const username = useParams({
    from: "/user/$username",
    select: (params) => params.username,
  });

  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["user", username] });
  };

  const navigate = useNavigate();
  const { data: playerData, isLoading, isError } = usePlayerData(username!);
  const { data: countryData } = useCountryData(playerData?.country);

  if (isLoading || !playerData) return <ProfileSkeleton />;
  if (isError) return <ErrorFallback onRetry={handleRetry} />;

  return (
    <Container size="md" py="xl">
      <Paper shadow="lg" radius="lg" p="xl" withBorder>
        <Flex
          mb="xl"
          justify={{ base: "center", md: "flex-start" }}
          align="center"
          gap="md"
          wrap="wrap"
        >
          <Group w={{ base: "100%", md: "auto" }}>
            <Avatar size={120} radius="lg" src={playerData.avatar}>
              <IconChess size={60} />
            </Avatar>
          </Group>
          <Stack
            justify="center"
            w={{ base: "100%", md: "auto" }}
            gap="sm"
            style={{ flex: 1 }}
          >
            <Group align="center" gap="sm">
              <Title order={1} size="h2">
                {playerData.username}
              </Title>
              <Badge
                color="yellow"
                variant="filled"
                size="lg"
                leftSection={<IconTrophy size={16} />}
              >
                {playerData.title}
              </Badge>
              {playerData.status === "premium" && (
                <Badge
                  color="violet"
                  variant="light"
                  leftSection={<IconStar size={16} />}
                >
                  Premium
                </Badge>
              )}
            </Group>

            <Group gap="xs">
              <Text size="lg" fw={500} c="dimmed">
                {countryData?.code && countryCodeToFlag(countryData?.code)}{" "}
                {countryData?.name}
              </Text>
              <Badge
                color={getLeagueColor(playerData.league)}
                variant="light"
                size="md"
              >
                {playerData.league} League
              </Badge>
            </Group>

            <Group gap="md">
              <Tooltip label="View Chess.com Profile">
                <ActionIcon
                  component="a"
                  href={playerData.url}
                  target="_blank"
                  variant="light"
                  color="blue"
                  size="lg"
                >
                  <IconExternalLink size={20} />
                </ActionIcon>
              </Tooltip>
              <Group gap="xs">
                {playerData.is_streamer ? (
                  <IconVideo size={20} color="var(--mantine-color-green-6)" />
                ) : (
                  <IconVideoOff size={20} color="var(--mantine-color-gray-6)" />
                )}
                <Text size="sm" c="dimmed">
                  {playerData.is_streamer ? "Active Streamer" : "Not Streaming"}
                </Text>
              </Group>
            </Group>
          </Stack>
          <Button
            w={{ base: "100%", md: "auto" }}
            variant="light"
            onClick={() => navigate({ to: "/" })}
          >
            <IconArrowLeft /> Back to home
          </Button>
        </Flex>

        <Divider mb="xl" />

        <Grid mb="xl">
          <StatCard
            icon={<IconUsers size={20} />}
            color="blue"
            label="Followers"
            value={playerData.followers.toLocaleString()}
          />
          <StatCard
            icon={<IconCalendar size={20} />}
            color="green"
            label="Member Since"
            value={getJoinDate(playerData.joined)}
          />
          <LastOnline last_online={playerData.last_online} />
          <StatCard
            icon={<IconShield size={20} />}
            color="grape"
            label="Player ID"
            value={`#${playerData.player_id}`}
          />
        </Grid>

        <Card withBorder radius="md" p="lg" bg="gray.0">
          <Title order={3} mb="md">
            Profile Information
          </Title>
          <Stack gap="md">
            <InfoRow
              label="Account Status"
              value={
                <Badge
                  color={playerData.status === "premium" ? "violet" : "gray"}
                  variant="filled"
                  leftSection={<IconStar size={14} />}
                >
                  {playerData.status}
                </Badge>
              }
            />
            <InfoRow
              label="Verified Account"
              value={
                <Badge
                  color={playerData.verified ? "green" : "gray"}
                  variant={playerData.verified ? "filled" : "light"}
                >
                  {playerData.verified ? "Verified" : "Not Verified"}
                </Badge>
              }
            />
            <InfoRow
              label="Streaming Platforms"
              value={
                playerData.streaming_platforms.length > 0 ? (
                  <Group gap="xs" wrap="wrap">
                    {playerData.streaming_platforms.map((platform) =>
                      platform.channel_url ? (
                        <Anchor
                          key={platform.type}
                          href={platform.channel_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="sm"
                        >
                          {platform.type}{" "}
                          <IconExternalLink
                            size={14}
                            style={{ marginLeft: 4 }}
                          />
                        </Anchor>
                      ) : (
                        <Text key={platform.type} size="sm">
                          {platform.type}
                        </Text>
                      )
                    )}
                  </Group>
                ) : (
                  <Text size="sm" c="dimmed">
                    None
                  </Text>
                )
              }
            />
            <InfoRow
              label="Chess.com Profile"
              value={
                <Anchor href={playerData.url} target="_blank" size="sm">
                  View Full Profile
                  <IconExternalLink size={14} style={{ marginLeft: 4 }} />
                </Anchor>
              }
            />
          </Stack>
        </Card>
      </Paper>
    </Container>
  );
};

export default Profile;
