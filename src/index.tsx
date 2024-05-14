import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./service/ScrollToTop";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTE } from "./data/route";
import AIRWARE from "./project/airwareness/AirPage";
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
        element: <AIRWARE />,
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
