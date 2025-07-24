import { FaBars } from "react-icons/fa";
import { Link, Outlet } from "react-router";
import { UserCircle, Megaphone } from "lucide-react";
import SkyTowerLogo from "../../Components/SkyTowerLogo/SkyTowerLogo";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Components/Loader/Loader";
import useAuth from "../../Hooks/useAuth";
import { UserCog, Users, FileSignature, BadgePercent } from "lucide-react";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: userRole, isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  console.log(userRole);

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

          {/* user navigation */}
          {userRole?.role === "user" ||
            (user?.role === "member" && (
              <>
                <li>
                  <Link
                    to="/dashboard/my-profile"
                    className="flex items-center gap-2"
                  >
                    <UserCircle className="w-5 h-5" />
                    My Profile
                  </Link>
                </li>
              </>
            ))}

          {/* Member navigation */}

          {/* Admin navigation */}
          {userRole?.role === "admin" && (
            <>
              <li>
                <Link
                  to="/dashboard/admin-profile"
                  className="flex items-center gap-2"
                >
                  <UserCog className="w-5 h-5" />
                  Admin Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-members"
                  className="flex items-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Manage Members
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/make-announcement"
                  className="flex items-center gap-2"
                >
                  <Megaphone className="w-5 h-5" />
                  Make Announcements
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/agreement-requests"
                  className="flex items-center gap-2"
                >
                  <FileSignature className="w-5 h-5" />
                  Agreement Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-coupons"
                  className="flex items-center gap-2"
                >
                  <BadgePercent className="w-5 h-5" />
                  Manage Coupons
                </Link>
              </li>
            </>
          )}

          {/* Announcements */}
          <li>
            <Link
              to="/dashboard/announcements"
              className="flex items-center gap-2"
            >
              <Megaphone className="w-5 h-5" />
              Announcements
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
