import { useQuery } from "@tanstack/react-query";
import {
  FaBuilding,
  FaUsers,
  FaUserShield,
  FaCheckCircle,
  FaUserFriends,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: allApartments = [] } = useQuery({
    queryKey: ["all-apartments"],
    queryFn: async () => (await axiosPublic.get("/apartments/all")).data,
  });

  const totalApartments = allApartments.length;


  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });



  const totalMembers =
    users?.filter((user) => user.role === "member").length || 0;

  const availablePercent = totalApartments
    ? (((totalApartments - totalMembers) / totalApartments) * 100).toFixed(1)
    : 0;

  const unavailablePercent = 100 - availablePercent;

  return (
    <div className="p-6 space-y-8">
      {/* Profile Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 rounded-xl shadow-md p-6 flex items-center gap-6"
      >
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover border-4 border-primary"
        />
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaUserShield className="text-primary" /> {user?.displayName}
          </h2>
          <p className="flex items-center gap-2 text-base-content text-lg mt-1">
            <MdEmail /> {user?.email}
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard
          icon={FaBuilding}
          title="Total Apartments"
          value={totalApartments}
        />
        <StatCard
          icon={FaUserFriends}
          title="Total Members"
          value={totalMembers}
          color="text-secondary"
        />
        <StatCard
          icon={FaUsers}
          title="Total Users"
          value={users.length}
          color="text-accent"
        />
        <StatCard
          icon={FaCheckCircle}
          title="Available Rooms %"
          value={`${availablePercent}%`}
          color="text-success"
        />
        <StatCard
          icon={FaBuilding}
          title="Unavailable Rooms %"
          value={`${unavailablePercent}%`}
          color="text-error"
        />
      </div>
    </div>
  );
};

export default AdminProfile;
