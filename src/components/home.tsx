import { Container, SimpleGrid, Stack, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import GrandmasterCard from "../components/grandmaster-card";
import PaginationControls from "../components/pagination-controls";
import { useQuery } from "@tanstack/react-query";
import { fetchGrandmasters } from "../services/chess-api";
import { ActionIcon } from "@mantine/core";
import { IconChessFilled } from "@tabler/icons-react";
import ErrorFallback from "./error-fallback";
import HomeSkeleton from "./skeletons/home-skeleton";
import { useDebouncedValue } from "@mantine/hooks";

const ITEMS_PER_PAGE = 9;

const Home = () => {
  const [page, setPage] = useState(1);
  const grandmastersQuery = useQuery({
    queryKey: ["grandmasters"],
    queryFn: fetchGrandmasters,
  });
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 300);

  const players = grandmastersQuery.data?.players ?? [];
  const filteredPlayers =
    debouncedSearch.length === 0
      ? players
      : players.filter((v) =>
          v.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
  const playersPaginationLength = filteredPlayers.length;

  const paginatedPlayers = filteredPlayers.slice(
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
        <Stack>
          <TextInput
            radius="lg"
            size="lg"
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            placeholder="Search Grandmasters"
          ></TextInput>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
            {grandmasters.map((gm) => (
              <GrandmasterCard key={gm.name} {...gm} />
            ))}
          </SimpleGrid>
        </Stack>
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
