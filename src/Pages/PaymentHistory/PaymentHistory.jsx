import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Loader/Loader";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaReceipt,
  FaBuilding,
  FaLayerGroup,
  FaHashtag,
} from "react-icons/fa";

const PaymentHistory = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  console.log(user.email);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (payments.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No payment history found.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">Payment History</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {payments.map((payment) => (
          <motion.div
            key={payment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-6 shadow-lg border border-white/10 backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5"
          >
            <div className=" space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  Apartment {payment.apartmentNo}
                </h3>
                <span className="badge badge-accent text-white font-medium">
                  {payment.month}
                </span>
              </div>

              {/* Gradient line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-full"></div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaBuilding className="text-pink-400" />
                  <span className="text-lg font-medium">Block: {payment.block}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-yellow-400" />
                  <span className="text-lg font-medium">Floor: {payment.floor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-400" />
                  <span className="text-lg font-medium">Rent: ৳{payment.rent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-cyan-400" />
                  <span className="text-lg font-medium">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Transaction */}
              <div className="mt-4 flex items-start gap-2">
                <FaReceipt className="text-blue-400 mt-[2px]" />
                <div className="text-lg  break-all leading-snug">
                  <span className=" text-lg font-medium">Txn ID:</span>
                  <br />
                  {payment.transactionId}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
