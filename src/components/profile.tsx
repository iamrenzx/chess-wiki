import { useQuery } from "@tanstack/react-query";

import { Container, Text, Loader, Image } from "@mantine/core";
import { useParams } from "@tanstack/react-router";
import { fetchUser } from "../services/chess-api";

const Profile = () => {
  const username = useParams({
    from: "/user/$username",
    select: (params) => params.username,
  });

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchUser(username!),
    enabled: !!username,
  });

  if (isLoading) return <Loader />;
  if (isError) return <Text c="red">Failed to load user profile.</Text>;

  return (
    <Container>
      <Text size="xl" w={700} mb="md">
        {user.username}
      </Text>
      {user.avatar && (
        <Image src={user.avatar} alt={user.username} width={200} />
      )}
      <Text>{user.name}</Text>
      <Text>{user.location}</Text>
    </Container>
  );
};

export default Profile;
