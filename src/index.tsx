import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./service/ScrollToTop";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTE } from "./data/route";
import PageSkeleton from "./component/PageSkeleton";
import lazyWithDelay from "./service/lazyWithDelay";
// Lazy load the components with minimum skeleton display time
const AIRWARE = lazyWithDelay(() => import("./project/airwareness/AirPage"));
const MLP = lazyWithDelay(() => import("./project/mlp/MlpPage"));
const CAPSNAP = lazyWithDelay(() => import("./project/capsnap/CapsnapPage"));
const GOAPI = lazyWithDelay(() => import("./project/goapi/GoApi"));
const NETAPI = lazyWithDelay(() => import("./project/netapi/NetApi"));
const CARIN = lazyWithDelay(() => import("./project/carin/Carin"));
const MIN = lazyWithDelay(() => import("./project/min/Min"));
const NAMJAI = lazyWithDelay(() => import("./experience/namjai/NAM"));
const TA = lazyWithDelay(() => import("./experience/ta/TA"));
const WAANME = lazyWithDelay(() => import("./experience/waanme/WAANME"));
const BINBOT = lazyWithDelay(() => import("./project/binbot/Binbot"));
const FOOD = lazyWithDelay(() => import("./project/food/Food"));
const WATER = lazyWithDelay(() => import("./project/water/Water"));
const COMPILER = lazyWithDelay(() => import("./project/compiler/Com"));
const KIBO = lazyWithDelay(() => import("./project/kibo/Kibo"));
const CHECK = lazyWithDelay(() => import("./project/check/Check"));
const Note = lazyWithDelay(() => import("./component/NoteReact"));
const LIFECYCLE = lazyWithDelay(() => import("./component/ReactLifecycle"));
const INLINE = lazyWithDelay(() => import("./component/ReactInlineProp"));

const router = createBrowserRouter([
  {
    element: <ScrollToTop />,
    children: [
      {
        path: "/",
        element: <App />,
      },

      {
        path: ROUTE.AIRWARE,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <AIRWARE />
          </Suspense>
        ),
      },
      {
        path: ROUTE.MLP,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <MLP />
          </Suspense>
        ),
      },
      {
        path: ROUTE.CAPSNAP,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <CAPSNAP />
          </Suspense>
        ),
      },
      {
        path: ROUTE.GOAPI,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <GOAPI />
          </Suspense>
        ),
      },
      {
        path: ROUTE.NETAPI,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <NETAPI />
          </Suspense>
        ),
      },
      {
        path: ROUTE.CARIN,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <CARIN />
          </Suspense>
        ),
      },
      {
        path: ROUTE.MIN,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <MIN />
          </Suspense>
        ),
      },
      {
        path: ROUTE.NAMJAI,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <NAMJAI />
          </Suspense>
        ),
      },
      {
        path: ROUTE.WAANME,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <WAANME />
          </Suspense>
        ),
      },
      {
        path: ROUTE.TA,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <TA />
          </Suspense>
        ),
      },
      {
        path: ROUTE.BINBOT,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <BINBOT />
          </Suspense>
        ),
      },
      {
        path: ROUTE.FOOD,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <FOOD />
          </Suspense>
        ),
      },
      {
        path: ROUTE.WATER,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <WATER />
          </Suspense>
        ),
      },
      {
        path: ROUTE.COMPILER,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <COMPILER />
          </Suspense>
        ),
      },
      {
        path: ROUTE.KIBO,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <KIBO />
          </Suspense>
        ),
      },
      {
        path: ROUTE.CHECK,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <CHECK />
          </Suspense>
        ),
      },
      {
        path: ROUTE.NOTE,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Note />
          </Suspense>
        ),
      },
      {
        path: ROUTE.LIFECYCLE,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <LIFECYCLE />
          </Suspense>
        ),
      },
      {
        path: ROUTE.INLINE,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <INLINE />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
