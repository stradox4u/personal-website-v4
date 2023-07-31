import { createIPX, createIPXMiddleware } from "ipx";

export default defineNuxtPlugin(() => {
  const ipx = createIPX({});
  createIPXMiddleware(ipx);
});
