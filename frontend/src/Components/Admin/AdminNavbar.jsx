import logo from "../../assets/logo.jpg";

const AdminNavbar = ({ onLogout }) => {
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("adminToken");
      if (onLogout) onLogout(); // trigger UI change in App.jsx
    }
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={logo} alt="Not Found" className="w-[max(10%,80px)]" />
      <button
        onClick={handleLogout}
        className="bg-gray-500 hover:bg-gray-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full"
      >
        LogOut
      </button>
    </div>
  );
};

export default AdminNavbar;
