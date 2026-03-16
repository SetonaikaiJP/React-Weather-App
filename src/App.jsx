/* eslint-disable no-unused-vars */
import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminPage from "./pages/AdminPage";
import { FeatureFlagsProvider } from "./context/FeatureFlagsContext";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin" element={<AdminPage />} />
      </>
    )
  );

  return (
    <FeatureFlagsProvider>
      <RouterProvider router={router} />
    </FeatureFlagsProvider>
  );
};

export default App;
