import { createBrowserRouter } from "react-router";

import PrivateRoute from "../Provider/PrivateRoute";

import RootLayout from "../Layouts/RootLayouts/RootLayout";
import Login from "../Layouts/AuthLayouts/Login";
import Register from "../Layouts/AuthLayouts/Register";
import HomePage from "../Pages/Home/HomePage";
import ErrorPage from "../Pages/Error/ErrorPage";
import MyJobs from "../Pages/MyJob/MyJobs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/myJobs",
        element: (
          <PrivateRoute>
            <MyJobs></MyJobs>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);
