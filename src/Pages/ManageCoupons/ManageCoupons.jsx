import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [expiryUpdates, setExpiryUpdates] = useState({});
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axiosPublic.get("/coupons");
        console.log("Coupon response:", res.data);
        setCoupons(res.data);
      } catch (error) {
        console.error("Failed to load coupons", error);
      }
    };

    fetchCoupons();
  }, []);

  // Handle expiry date change
  const handleDateChange = (id, value) => {
    setExpiryUpdates((prev) => ({ ...prev, [id]: value }));
  };

  // Handle update
  const handleUpdate = async (id) => {
    const expiryDate = expiryUpdates[id];
    if (!expiryDate) return alert("Please select a date");

    try {
      const res = await axiosSecure.patch(`/coupons/${id}`, { expiryDate });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Coupon updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to update coupon", error);
      alert("Failed to update coupon");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Coupons</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Code</th>
              <th className="border px-4 py-2 text-left">Discount</th>
              <th className="border px-4 py-2 text-left">Expiry Date</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td className="border px-4 py-2">{coupon.title}</td>
                <td className="border px-4 py-2">{coupon.code}</td>
                <td className="border px-4 py-2">{coupon.discount}%</td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    defaultValue={coupon.expiryDate?.split("T")[0]}
                    onChange={(e) =>
                      handleDateChange(coupon._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdate(coupon._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupon;
