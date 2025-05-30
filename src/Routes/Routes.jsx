import { createBrowserRouter } from "react-router";

import PrivateRoute from "../Provider/PrivateRoute";

import RootLayout from "../Layouts/RootLayouts/RootLayout";
import Login from "../Layouts/AuthLayouts/Login";
import Register from "../Layouts/AuthLayouts/Register";
import HomePage from "../Pages/Home/HomePage";
import ErrorPage from "../Pages/Error/ErrorPage";
import JobDetails from "../Pages/JobDetails/JobDetails";
import JobApply from "../Pages/JobDetails/JobApply";
import MyApplications from "../Pages/MyApplications/MyApplications";

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
        path: "/jobs/:id",
        loader: ({ params }) =>
          fetch(
            `https://career-code-server-omega.vercel.app/jobs/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApply></JobApply>
          </PrivateRoute>
        ),
      },
      {
        path: "/myApplications",
        element: (
          <PrivateRoute>
            <MyApplications></MyApplications>
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
