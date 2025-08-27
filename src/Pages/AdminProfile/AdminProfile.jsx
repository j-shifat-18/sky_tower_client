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
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend, // 🔹 NEW
} from "recharts";
import StatCard from "./StatCard";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const COLORS = ["#10B981", "#EF4444"]; // success, error colors

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // Apartments
  const { data: allApartments = [] } = useQuery({
    queryKey: ["all-apartments"],
    queryFn: async () => (await axiosPublic.get("/apartments/all")).data,
  });
  const totalApartments = allApartments.length;

  // Users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });
  const totalMembers =
    users?.filter((user) => user.role === "member").length || 0;

  const availablePercent = totalApartments
    ? (((totalApartments - totalMembers) / totalApartments) * 100).toFixed(2)
    : 0;
  const unavailablePercent = (100 - availablePercent).toFixed(2);

  // 🔹 Payments
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => (await axiosSecure.get("/payments")).data,
  });

  // 🔹 Prepare data for LineChart (monthly rent totals)
  const monthlyTotals = payments.reduce((acc, payment) => {
    const date = new Date(payment.createdAt);

    // Format like: "Jul 2025"
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!acc[month]) acc[month] = 0;
    acc[month] += Number(payment.rent);
    return acc;
  }, {});

  // Convert object to array
  let paymentData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  // 🔹 Sort chronologically by actual Date (not string order)
  paymentData = paymentData.sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  console.log("PaymentData for chart:", paymentData);

  // Chart data
  const vacancyData = [
    { name: "Available", value: Number(availablePercent) },
    { name: "Unavailable", value: Number(unavailablePercent) },
  ];
  const memberData = [
    { name: "Members", value: totalMembers },
    { name: "Users", value: users.length },
  ];

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
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vacancy Pie Chart */}
        <div className="bg-base-100 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Apartment Availability</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563eb" /> {/* blue-600 */}
                  <stop offset="100%" stopColor="#38bdf8" /> {/* sky-400 */}
                </linearGradient>

                <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#dc2626" /> {/* red-600 */}
                  <stop offset="100%" stopColor="#fda4af" /> {/* rose-400 */}
                </linearGradient>
              </defs>

              <Pie
                data={vacancyData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {vacancyData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      entry.name === "Available"
                        ? "url(#blueGradient)"
                        : "url(#redGradient)"
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Members vs Users Bar Chart */}
        <div className="bg-base-100 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Users & Members</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={memberData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Payments Line Chart */}
      <div className="bg-base-100 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Monthly Payments Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={paymentData}>
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="lineBlueGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" /> {/* blue-600 */}
                <stop offset="100%" stopColor="#38bdf8" /> {/* sky-400 */}
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke="url(#lineBlueGradient)" // 🔹 use gradient
              strokeWidth={3}
              dot={{ r: 5, fill: "#2563eb" }} // optional: dot color
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminProfile;
