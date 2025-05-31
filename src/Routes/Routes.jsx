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
import AddJob from "../Pages/AddJobs/AddJob";
import MyPostedJobs from "../Pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../Pages/ViewApplications/ViewApplicaitons";

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
      {
        path: "/addJob",
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: "/myPostedJobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs></MyPostedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/applications/:job_id",
        element: (
          <PrivateRoute>
            <ViewApplications></ViewApplications>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://career-code-server-omega.vercel.app/applications/job/${params.job_id}`
          ),
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);
