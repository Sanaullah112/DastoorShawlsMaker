import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Stoon from "./pages/Stone/Stoon";
import NotFound from "./pages/NotFound";
import Logout from "./pages/Logout";
import { Toaster } from "react-hot-toast";
import TopMessage from "./Components/TopMessage";
import Contact from "./Components/Footer/Contact";
import About from "./Components/Footer/About";
import Blogs from "./Components/Blogs/Blogs";
import BlogsS from "./Components/Blogs/BlogsS";
import BlogDetails from "./Components/Blogs/BlogsDeatils";
import FAQs from "./Components/Footer/FAQs";
import Privacy_Policy from "./Components/Footer/Privecy_policy";
import Team from "./Components/Footer/Team";
import Collection from "./pages/Collection/Collection";
import ProductDetail from "./pages/Collection/ProductDetail";

// Admin imports
import Add from "./pages/Admin/Add";
import List from "./pages/Admin/List";
import Orders from "./pages/Admin/Order";
import AdminLogin from "./Components/Admin/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import AdminHome from "./pages/Admin/AdminHome";
import { NavLink } from "react-router-dom";
import {
  FaPlus,
  FaList,
  FaShoppingCart,
  FaHome,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import img from './assets/products/logo.jpg'

export const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/";

// ---------- FRONTEND ----------
const FrontendRoutes = () => {
  const location = useLocation();
  const showNav = [
    "/", "/stone", "/login", "/contact", "/about", "/register", "/faqs",
    "/privacy", "/team", "/collection"
  ];
  const shouldShowNav = showNav.some(path => location.pathname.startsWith(path));

  return (
    <>
      {shouldShowNav && <Navbar />}
      {shouldShowNav && <TopMessage />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/pdetail/:id" element={<ProductDetail />} />
        <Route path="/stone" element={<Stoon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blogs" element={<BlogsS />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy" element={<Privacy_Policy />} />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {shouldShowNav && <Footer />}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

// ---------- ADMIN ----------
const AdminRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

// ...

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You’ll be logged out of the admin panel.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    customClass: {
      popup: "rounded-2xl shadow-lg",
      confirmButton: "px-5 py-2 rounded-md",
      cancelButton: "px-5 py-2 rounded-md",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Logged Out",
        text: "You have been successfully logged out.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });

      setTimeout(() => {
        localStorage.removeItem("adminToken");
        setToken("");
      }, 1500);
    }
  });
};


  if (!token) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <ToastContainer position="top-right" autoClose={3000} />
        <AdminLogin setToken={setToken} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* 🔹 Admin Top Navbar */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <img className="max-w-[100px] font-bold text-gray-800 tracking-wide" src={img} alt="Dastoor Admin Panel" />
         

          <nav className="flex gap-4">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaHome /> <span className="hidden sm:inline">Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/add"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaPlus /> <span className="hidden sm:inline">Add</span>
            </NavLink>

            <NavLink
              to="/admin/list"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaList /> <span className="hidden sm:inline">List</span>
            </NavLink>

            <NavLink
              to="/admin/order"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaShoppingCart /> <span className="hidden sm:inline">Orders</span>
            </NavLink>

           <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
            >
              <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
            </button>

          </nav>
        </div>
      </header>

      {/* 🔹 Main Page Content */}
      <main className="flex-1 p-6">
        <Routes>
          <Route index element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/add" element={<Add />} />
          <Route path="/admin/list" element={<List />} />
          <Route path="/admin/order" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
};

// ---------- MAIN APP ----------
// ---------- MAIN APP ----------
const App = () => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/admin-login";

  return (
    <div>
      {isAdminRoute ? <AdminRoutes /> : <FrontendRoutes />}
    </div>
  );
};



export default App;
