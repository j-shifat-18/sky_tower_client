import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";

const MyProfile = () => {
  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();

  const { data: member = [], isLoading } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/member-agreements?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  const createdAt = member.createdAt;
  const agreementAcceptenceDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-300 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex items-center gap-6 mb-6">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <p className="text-xl font-semibold">{user?.displayName || "N/A"}</p>
          <p className="text-gray-600">{user?.email || "N/A"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-base-100 p-4 rounded shadow">
          <p className="font-medium text-gray-500">Agreement Accept Date</p>
          <p className="text-lg">{agreementAcceptenceDate || "None"}</p>
        </div>
        <div className="bg-base-100 p-4 rounded shadow">
          <p className="font-medium text-gray-500">Floor</p>
          <p className="text-lg">{member?.floor || "None"}</p>
        </div>
        <div className="bg-base-100 p-4 rounded shadow">
          <p className="font-medium text-gray-500">Block</p>
          <p className="text-lg">{member?.block || "None"}</p>
        </div>
        <div className="bg-base-100 p-4 rounded shadow">
          <p className="font-medium text-gray-500">Room No</p>
          <p className="text-lg">{member?.apartmentNo || "None"}</p>
        </div>
        <div className="bg-base-100 p-4 rounded shadow">
          <p className="font-medium text-gray-500">Rent</p>
          <p className="text-lg">{member?.rent || "None"}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
