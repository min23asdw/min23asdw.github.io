import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./service/ScrollToTop";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTE } from "./data/route";
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
const Note = lazy(() => import("./component/NoteReact"));

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
          <Suspense fallback={<div>Loading...</div>}>
            <AIRWARE />
          </Suspense>
        ),
      },
      {
        path: ROUTE.MLP,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MLP />
          </Suspense>
        ),
      },
      {
        path: ROUTE.CAPSNAP,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CAPSNAP />
          </Suspense>
        ),
      },
      {
        path: ROUTE.GOAPI,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GOAPI />
          </Suspense>
        ),
      },
      {
        path: ROUTE.NETAPI,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NETAPI />
          </Suspense>
        ),
      },
      {
        path: ROUTE.CARIN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CARIN />
          </Suspense>
        ),
      },
      {
        path: ROUTE.MIN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MIN />
          </Suspense>
        ),
      },
      {
        path: ROUTE.NAMJAI,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NAMJAI />
          </Suspense>
        ),
      },
      {
        path: ROUTE.WAANME,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <WAANME />
          </Suspense>
        ),
      },
      {
        path: ROUTE.TA,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TA />
          </Suspense>
        ),
      },
      {
        path: ROUTE.BINBOT,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BINBOT />
          </Suspense>
        ),
      },
      {
        path: ROUTE.FOOD,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FOOD />
          </Suspense>
        ),
      },
      {
        path: ROUTE.WATER,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <WATER />
          </Suspense>
        ),
      },
      {
        path: ROUTE.COMPILER,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <COMPILER />
          </Suspense>
        ),
      },
      {
        path: ROUTE.KIBO,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <KIBO />
          </Suspense>
        ),
      },
      {
        path: ROUTE.NOTE,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Note />
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
