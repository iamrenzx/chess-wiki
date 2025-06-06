import { createFileRoute } from "@tanstack/react-router";

import Profile from "../../components/profile";
export const Route = createFileRoute("/user/$username")({
  component: Profile,
});
