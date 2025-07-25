import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Check, XCircle, User, Home } from "lucide-react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: agreements = [], refetch, isLoading } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements");
      return res.data.filter((a) => a.status === "pending");
    },
  });

  const handleAccept = async (id, email) => {
    await axiosSecure.patch(`/agreements/${id}/accept`, { email });
    Swal.fire({
            icon: 'success',
            title: 'Agreement accepted!',
            showConfirmButton: false,
            timer: 1500
          });
    refetch();
  };

  const handleReject = async (id) => {
    await axiosSecure.patch(`/agreements/${id}/reject`);
    Swal.fire({
            icon: 'success',
            title: 'Agreement rejected!',
            showConfirmButton: false,
            timer: 1500
          });
    refetch();
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {agreements.map((a) => (
        <motion.div
          key={a._id}
          className="rounded-2xl shadow-xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-blue-100 hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <User className="text-primary" />
              <div>
                <h2 className="text-xl font-bold text-primary">{a.userName}</h2>
                <p className="text-sm text-gray-500">{a.userEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Home className="text-blue-600" />
              <span className="font-medium">
                {a.floor} Floor, Block {a.block}, Room {a.room}
              </span>
            </div>

            <p>
              <span className="font-semibold text-gray-700">Rent:</span>{" "}
              <span className="text-green-600 font-bold">${a.rent}</span>
            </p>

            <p className="text-sm text-gray-500">
              Requested on:{" "}
              <span className="text-gray-800 font-medium">
                {new Date(a.requestDate).toLocaleDateString()}
              </span>
            </p>

            <div className="flex justify-end gap-3 pt-4">
              <button
                className="btn  rounded-full px-4 flex items-center gap-2 bg-blue-300 font-medium border-none hover:bg-primary hover:text-white"
                onClick={() => handleAccept(a._id, a.userEmail)}
              >
                <Check className="w-4 h-4" />
                Accept
              </button>
              <button
                className="btn rounded-full px-4 flex items-center gap-2 bg-red-300 hover:bg-red-600 hover:text-white font-medium"
                onClick={() => handleReject(a._id)}
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AgreementRequests;
