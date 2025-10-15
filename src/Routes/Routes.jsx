import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Pages/Root/Root";
import AllApps from "../Pages/AllApps/AllApps";
import AppDetails from "../Components/AppDetails/AppDetails";
import InstalledApps from "../Pages/InstalledApps/InstalledApps";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ErrorAppPage from "../Pages/ErrorAppPage/ErrorAppPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element:<Home></Home>,
      },
      {
        path: "allApps",
        element:<AllApps></AllApps>,
      },
      {
        path: "allApps/:id",
        loader: ({ params }) => {},
        element: <AppDetails></AppDetails>,
        errorElement: <ErrorAppPage />,
      },
      {
        path: "installedApps",
        element: <InstalledApps></InstalledApps>,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
//