import { Container, SimpleGrid, Stack, Title } from "@mantine/core";
import { useState } from "react";
import GrandmasterCard from "../components/grandmaster-card";
import PaginationControls from "../components/pagination-controls";
import { useQuery } from "@tanstack/react-query";
import { fetchGrandmasters } from "../services/chess-api";
import { ActionIcon } from "@mantine/core";
import { IconChessFilled } from "@tabler/icons-react";
import ErrorFallback from "./error-fallback";
import HomeSkeleton from "./skeletons/home-skeleton";

const ITEMS_PER_PAGE = 9;

const Home = () => {
  const [page, setPage] = useState(1);
  const grandmastersQuery = useQuery({
    queryKey: ["grandmasters"],
    queryFn: fetchGrandmasters,
  });
  const players = grandmastersQuery.data?.players ?? [];
  const playersPaginationLength = players.length;

  const paginatedPlayers = players.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const grandmasters = paginatedPlayers.map((username) => ({
    name: username,
  }));

  return (
    <Container py={2}>
      <Stack my="md">
        <Title ta="center" order={1} c="white">
          <ActionIcon mr={5} variant="filled" aria-label="ChessIcon">
            <IconChessFilled stroke={1.5} />
          </ActionIcon>
          Chess Grandmasters Wiki
        </Title>
        <Title ta="center" c="white" order={5}>
          Discover the world's greatest chess players
        </Title>
      </Stack>
      {grandmastersQuery.isLoading ? (
        <HomeSkeleton items={ITEMS_PER_PAGE} />
      ) : grandmastersQuery.isError ? (
        <ErrorFallback />
      ) : (
        <SimpleGrid cols={3} spacing="md">
          {grandmasters.map((gm) => (
            <GrandmasterCard key={gm.name} {...gm} />
          ))}
        </SimpleGrid>
      )}
      <PaginationControls
        page={page}
        total={Math.ceil(playersPaginationLength / ITEMS_PER_PAGE)}
        onChange={setPage}
      />
    </Container>
  );
};

export default Home;
