import { ROUTE } from "./route";

// Map routes to their lazy import functions for prefetching on hover
const routePrefetchMap: Record<string, () => Promise<unknown>> = {
  [ROUTE.AIRWARE]: () => import("../project/airwareness/AirPage"),
  [ROUTE.MLP]: () => import("../project/mlp/MlpPage"),
  [ROUTE.CAPSNAP]: () => import("../project/capsnap/CapsnapPage"),
  [ROUTE.GOAPI]: () => import("../project/goapi/GoApi"),
  [ROUTE.NETAPI]: () => import("../project/netapi/NetApi"),
  [ROUTE.CARIN]: () => import("../project/carin/Carin"),
  [ROUTE.MIN]: () => import("../project/min/Min"),
  [ROUTE.NAMJAI]: () => import("../experience/namjai/NAM"),
  [ROUTE.WAANME]: () => import("../experience/waanme/WAANME"),
  [ROUTE.TA]: () => import("../experience/ta/TA"),
  [ROUTE.BINBOT]: () => import("../project/binbot/Binbot"),
  [ROUTE.FOOD]: () => import("../project/food/Food"),
  [ROUTE.WATER]: () => import("../project/water/Water"),
  [ROUTE.COMPILER]: () => import("../project/compiler/Com"),
  [ROUTE.KIBO]: () => import("../project/kibo/Kibo"),
  [ROUTE.CHECK]: () => import("../project/check/Check"),
};

const prefetched = new Set<string>();

export const prefetchRoute = (path: string) => {
  if (prefetched.has(path)) return;
  const loader = routePrefetchMap[path];
  if (loader) {
    prefetched.add(path);
    loader();
  }
};
