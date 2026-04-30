import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Addservice from "./pages/Addservice";
import Viewservice from "./pages/Viewservice";
import Appointment from "./pages/Appointment";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ADMIN AREA */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-service" element={<Addservice />} />
          <Route path="view-service" element={<Viewservice />} />
          <Route path="appointment" element={<Appointment />} />

          <Route path="service/:id" element={<Addservice />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;