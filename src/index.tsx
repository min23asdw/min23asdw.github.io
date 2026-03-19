import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./service/ScrollToTop";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTE } from "./data/route";
import PageSkeleton from "./component/PageSkeleton";
// Lazy load the components
const AIRWARE = lazy(() => import("./project/airwareness/AirPage"));
const MLP = lazy(() => import("./project/mlp/MlpPage"));
const CAPSNAP = lazy(() => import("./project/capsnap/CapsnapPage"));
const GOAPI = lazy(() => import("./project/goapi/GoApi"));
const NETAPI = lazy(() => import("./project/netapi/NetApi"));
const CARIN = lazy(() => import("./project/carin/Carin"));
const MIN = lazy(() => import("./project/min/Min"));
const NAMJAI = lazy(() => import("./experience/namjai/NAM"));
const TA = lazy(() => import("./experience/ta/TA"));
const WAANME = lazy(() => import("./experience/waanme/WAANME"));
const BINBOT = lazy(() => import("./project/binbot/Binbot"));
const FOOD = lazy(() => import("./project/food/Food"));
const WATER = lazy(() => import("./project/water/Water"));
const COMPILER = lazy(() => import("./project/compiler/Com"));
const KIBO = lazy(() => import("./project/kibo/Kibo"));
const CHECK = lazy(() => import("./project/check/Check"));
const Note = lazy(() => import("./component/NoteReact"));
const LIFECYCLE = lazy(() => import("./component/ReactLifecycle"));
const INLINE = lazy(() => import("./component/ReactInlineProp"));

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
