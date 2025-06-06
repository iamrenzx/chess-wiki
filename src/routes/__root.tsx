import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Container, Paper } from "@mantine/core";
import Header from "../components/header";

export const Route = createRootRoute({
  component: () => (
    <Paper
      style={{
        background: "linear-gradient(to right, #A7D1A9,#74B778, #419A44)",
      }}
      mih="100vh"
    >
      <Container py={2}>
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </Container>
    </Paper>
  ),
});
