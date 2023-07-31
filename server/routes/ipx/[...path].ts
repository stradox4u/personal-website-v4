import { createIPX, createIPXMiddleware } from "ipx";

const ipx = createIPX({
  maxAge: 3600,
  domains: [
    'localhost',
    'arcodeh.pro',
  ],
});

const ipxMiddleWare = createIPXMiddleware(ipx);
const ipxHandler = fromNodeMiddleware(ipxMiddleWare);

export default eventHandler((event) => {
  event.node.req.url = `/${event.context.params!.path}`;
  console.log(event.context.params!.path);
  return ipxHandler(event);
});