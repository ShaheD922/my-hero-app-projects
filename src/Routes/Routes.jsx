import { createBrowserRouter } from "react-router";

import Home from "../Pages/Home/Home";
import Root from "../Pages/Root/Root";
import AllApps from "../Pages/AllApps/AllApps";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path:"allApps",
       element: <AllApps></AllApps>
      },



      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
