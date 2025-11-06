import { NavLink } from "react-router-dom";
import {
  FaPlus,
  FaList,
  FaShoppingCart,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SiteBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/admin", icon: <FaHome />, label: "Dashboard" },
    { to: "/admin/add", icon: <FaPlus />, label: "Add Items" },
    { to: "/admin/list", icon: <FaList />, label: "List Items" },
    { to: "/admin/order", icon: <FaShoppingCart />, label: "Orders" },
  ];

  return (
    <>
      {/* 🔹 Top bar (mobile only) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md border text-gray-700 hover:bg-gray-100"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* 🔹 Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-[18%] min-h-screen border-r bg-white shadow-sm">
        <div className="py-8 px-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Dastoor Admin
          </h1>
        </div>

        <div className="flex flex-col gap-3 pt-6 px-6 text-[15px]">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              <p>{label}</p>
            </NavLink>
          ))}
        </div>
      </div>

      {/* 🔹 Mobile Sidebar Drawer (Framer Motion animation) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <h2 className="text-lg font-semibold text-gray-800">
                  Dastoor Admin
                </h2>
              <div className=" p-4 border-b">
              
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-2 p-4">
                {navItems.map(({ to, icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-all ${
                        isActive
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg">{icon}</span>
                    <p>{label}</p>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteBar;
