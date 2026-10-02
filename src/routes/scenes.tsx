import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scenes")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto my-0 overflow-hidden bg-transparent pl-5">
      <Outlet />
    </div>
  );
}
