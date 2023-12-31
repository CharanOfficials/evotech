import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Survey from "./pages/Survey.jsx";
import SurveyProvider from "./context/survey.provider.jsx";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/survey",
        element: <Survey />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <SurveyProvider>
        <RouterProvider router={Router} />
      </SurveyProvider>
    </ChakraProvider>
  </React.StrictMode>
);
