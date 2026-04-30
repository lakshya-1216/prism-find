import { createFileRoute } from "@tanstack/react-router";
import { HeroSearch } from "@/components/HeroSearch";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="dark min-h-screen bg-background">
      <HeroSearch />
    </main>
  );
}
