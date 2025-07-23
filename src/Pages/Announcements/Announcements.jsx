import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion } from "framer-motion";
import Loader from "../../Components/Loader/Loader";

const Announcements = () => {
  const axiosPublic = useAxiosPublic();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcements");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Community Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((announcement) => (
          <motion.div
            key={announcement._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`border-l-4 rounded-lg shadow p-4 space-y-2 ${
              announcement.importance === "high"
                ? "border-red-500"
                : announcement.importance === "medium"
                ? "border-yellow-400"
                : "border-green-400"
            } bg-base-100`}
          >
            <div className="flex justify-between text-sm text-gray-500">
              <span className="capitalize">
                📌 <strong>Importance:</strong> {announcement.importance}
              </span>
              <span className="capitalize bg-base-300 rounded-lg py-1 px-2 text-primary">
                {announcement.type}
              </span>
            </div>
            <h3 className="text-xl font-semibold">{announcement.title}</h3>
            <p className="text-gray-700">{announcement.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
