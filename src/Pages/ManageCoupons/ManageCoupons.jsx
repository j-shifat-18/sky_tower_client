import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [expiryUpdates, setExpiryUpdates] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    title: "",
    description: "",
    code: "",
    discount: "",
    expiryDate: "",
  });

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axiosPublic.get("/coupons");
        setCoupons(res.data);
      } catch (error) {
        console.error("Failed to load coupons", error);
      }
    };
    fetchCoupons();
  }, []);

  const handleDateChange = (id, value) => {
    setExpiryUpdates((prev) => ({ ...prev, [id]: value }));
  };

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
        // Refresh coupons
        const refresh = await axiosPublic.get("/coupons");
        setCoupons(refresh.data);
      }
    } catch (error) {
      console.error("Failed to update coupon", error);
      alert("Failed to update coupon");
    }
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/coupons", newCoupon);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Coupon added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowModal(false);
        setNewCoupon({
          title: "",
          description: "",
          code: "",
          discount: "",
          expiryDate: "",
        });
        const refresh = await axiosPublic.get("/coupons");
        setCoupons(refresh.data);
      }
    } catch (error) {
      console.error("Failed to add coupon", error);
      alert("Failed to add coupon");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Coupons</h2>
        <button
          className="btn bg-green-400 font-medium"
          onClick={() => setShowModal(true)}
        >
          + Add New Coupon
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Code</th>
              <th className="border px-4 py-2">Discount</th>
              <th className="border px-4 py-2">Expiry Date</th>
              <th className="border px-4 py-2">Actions</th>
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
                    className="input input-bordered w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdate(coupon._id)}
                    className="btn btn-info btn-sm"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DaisyUI Modal */}
      <input
        type="checkbox"
        id="add-coupon-modal"
        className="modal-toggle"
        checked={showModal}
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-coupon-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setShowModal(false)}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-4">Add New Coupon</h3>
          <form onSubmit={handleAddCoupon} className="space-y-3">
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className="input input-bordered w-full"
              value={newCoupon.title}
              onChange={handleNewInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              required
              className="textarea textarea-bordered w-full"
              value={newCoupon.description}
              onChange={handleNewInputChange}
            />
            <input
              type="text"
              name="code"
              placeholder="Coupon Code"
              required
              className="input input-bordered w-full"
              value={newCoupon.code}
              onChange={handleNewInputChange}
            />
            <input
              type="number"
              name="discount"
              placeholder="Discount (%)"
              required
              className="input input-bordered w-full"
              value={newCoupon.discount}
              onChange={handleNewInputChange}
            />
            <input
              type="date"
              name="expiryDate"
              required
              className="input input-bordered w-full"
              value={newCoupon.expiryDate}
              onChange={handleNewInputChange}
            />

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Coupon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageCoupon;
