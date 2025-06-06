import { Container, Group, Anchor } from "@mantine/core";
import { Link, useLocation } from "@tanstack/react-router";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Container my="md">
      <Group gap="md">
        <Anchor
          c="white"
          fw="500"
          p="8px 16px"
          style={{
            borderRadius: "6px",
            backgroundColor: isActive("/")
              ? "rgba(255, 255, 255, 0.2)"
              : "transparent",
          }}
          component={Link}
          to="/"
          underline="never"
        >
          Home
        </Anchor>
        <Anchor
          component={Link}
          c="white"
          fw="500"
          p="8px 16px"
          style={{
            borderRadius: "6px",
            backgroundColor: isActive("/browse")
              ? "rgba(255, 255, 255, 0.2)"
              : "transparent",
          }}
          to="/browse"
          underline="never"
        >
          Browse
        </Anchor>
        <Anchor
          component={Link}
          c="white"
          fw="500"
          p="8px 16px"
          style={{
            borderRadius: "6px",
            backgroundColor: isActive("/topgms")
              ? "rgba(255, 255, 255, 0.2)"
              : "transparent",
          }}
          to="/topgms"
          underline="never"
        >
          Top GMs
        </Anchor>
      </Group>
    </Container>
  );
};

export default Header;
