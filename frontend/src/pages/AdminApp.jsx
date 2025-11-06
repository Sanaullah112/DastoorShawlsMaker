// pages/AdminApp.jsx
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLogin from "../Components/Admin/AdminLogin";
import AdminNavbar from "../Components/Admin/AdminNavbar";
import SiteBar from "../Components/Admin/SiteBar";
import Add from "./Admin/Add";
import List from "./Admin/List";
import Orders from "./Admin/Order";

const AdminApp = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
  };

 return (
  <div className="bg-gray-50 min-h-screen">
    <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      <Route
        path="/admin-login"
        element={<AdminLogin setToken={setToken} />}
      />
      {token && (
        <Route
          path="/admin/*"
          element={
            <>
              <AdminNavbar onLogout={handleLogout} />
              <hr />
              <div className="flex w-full">
                <SiteBar />
                <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                  <Routes>
                    <Route path="add" element={<Add />} />
                    <Route path="list" element={<List />} />
                    <Route path="order" element={<Orders />} />
                  </Routes>
                </div>
              </div>
            </>
          }
        />
      )}
    </Routes>
  </div>
);

};

export default AdminApp;
