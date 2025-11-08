import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import SingleUser from "./components/SingleUser.jsx";
import UpdatedUser from "./components/UpdatedUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path : '/users/:id',
    loader : ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
    element : <SingleUser></SingleUser>
  },
  {
    path : '/update/:id',
    loader : ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
    element : <UpdatedUser></UpdatedUser>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
