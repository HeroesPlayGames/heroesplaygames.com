import { Outlet, createFileRoute } from "@tanstack/react-router";

import sceneStyles from "../sceneStyles.css?url";
import nunito900 from "@fontsource/nunito-sans/900.css?url";

export const Route = createFileRoute("/scenes")({
  component: RouteComponent,
  notFoundComponent: () => <div>Not Found</div>,
  head: () => ({
    links: [
      {
        rel: "stylesheet",
        href: sceneStyles,
      },
      { rel: "stylesheet", href: nunito900 },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="mx-auto my-0 overflow-hidden bg-transparent pl-5">
      <Outlet />
    </div>
  );
}
