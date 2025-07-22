import { FaBars } from "react-icons/fa";
import { Link, Outlet } from "react-router";
import { UserCircle, Megaphone } from "lucide-react";
import SkyTowerLogo from "../../Components/SkyTowerLogo/SkyTowerLogo";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle Button (Visible on small/medium) */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="w-full p-4 bg-base-200 flex justify-between items-center lg:hidden">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost text-xl">
            <FaBars />
          </label>
          <h2 className="text-lg font-bold">Dashboard</h2>
        </div>

        {/* Main Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Side Drawer */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content text-xl">
          <div className="mb-5">
            <SkyTowerLogo></SkyTowerLogo>
          </div>
          {/* Example Navigation Links */}
          <li>
            <Link
              to="/dashboard/my-profile"
              className="flex items-center gap-2"
            >
              <UserCircle className="w-5 h-5" />
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/announcements"
              className="flex items-center gap-2"
            >
              <Megaphone className="w-5 h-5" />
              Announcements
            </Link>
          </li>

          {/* Add conditionally rendered links for Member/Admin later */}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
