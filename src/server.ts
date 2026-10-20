import handler from "@tanstack/react-start/server-entry";

export { DonationSyncWorkflow } from "./donations/workflow";

export default {
  fetch: handler.fetch,
} as ExportedHandler<Env>;
