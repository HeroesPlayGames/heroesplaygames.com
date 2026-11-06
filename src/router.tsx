import { lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import * as TanstackQuery from "./integrations/tanstack-query/root-provider";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Lazy so the 8-bit styles (retro.css) only load when a 404 actually renders.
const NotFoundBrickBreaker = lazyRouteComponent(
  () => import("./components/ui/8bit/blocks/not-found-brick-breaker"),
  "NotFoundBrickBreaker",
);

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",
    defaultNotFoundComponent: () => <NotFoundBrickBreaker className="mt-1" cta="Home" />,
    Wrap: (props: { children: React.ReactNode }) => {
      return <TanstackQuery.Provider {...rqContext}>{props.children}</TanstackQuery.Provider>;
    },
  });

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient });

  return router;
};
