import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./Routes/Routes.jsx";

import { LoadingProvider } from "./CustomContext/LoadingContext.jsx";

createRoot(document.getElementById("root"))
.render(
  <StrictMode>
    <LoadingProvider>
      <RouterProvider router={router} />
    </LoadingProvider>
  </StrictMode>
);



 
