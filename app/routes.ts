import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { TOOL_LIST } from "./toolList";

export default [
    index("routes/Home.tsx"),
    ...TOOL_LIST.map(({ link, routeFile }) => route(link, routeFile))
] as const satisfies RouteConfig;
