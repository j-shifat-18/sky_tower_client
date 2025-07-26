import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";

import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MakePayment = () => {
  const { user } = useAuth(); // email and name
  const axiosSecure = useAxiosSecure();
  const [agreement, setAgreement] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discountedRent, setDiscountedRent] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/member-agreements?email=${user.email}`)
        .then((res) => {
          setAgreement(res.data);
          setValue("email", user.email);
          setValue("floor", res.data.floor);
          setValue("block", res.data.block);
          setValue("apartmentNo", res.data.apartmentNo);
          setValue("rent", res.data.rent);
        })
        .catch((err) => console.error(err));
    }
  }, [user, setValue, axiosSecure]);

  const handleCouponApply = async () => {
    if (!coupon || !agreement?.rent) return;

    try {
      setIsValidatingCoupon(true);
      const res = await axiosSecure.get(`/validate-coupon?code=${coupon}`);
      const { valid, discountPercentage, message } = res.data;

      if (valid && discountPercentage) {
        const newRent =
          agreement.rent - (agreement.rent * discountPercentage) / 100;

        // Update form state
        setValue("rent", newRent);
        setDiscountedRent(newRent);
        setCouponMessage(`Coupon applied! ${discountPercentage}% discount.`);
      } else {
        setDiscountedRent(null);
        setCouponMessage(message || "Invalid or expired coupon.");
      }
    } catch (err) {
      console.error("Coupon validation error:", err);
      setDiscountedRent(null);
      setCouponMessage("Error validating coupon.");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const onSubmit = (data) => {
    // console.log(data)
    navigate("/dashboard/payment-checkout", { state: data });
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-base-100 shadow-xl rounded-2xl mt-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Make Payment
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              readOnly
              className="input input-bordered w-full"
              {...register("email")}
            />
          </div>

          <div>
            <label className="label font-medium">Floor</label>
            <input
              type="number"
              readOnly
              className="input input-bordered w-full"
              {...register("floor")}
            />
          </div>

          <div>
            <label className="label font-medium">Block</label>
            <input
              type="text"
              readOnly
              className="input input-bordered w-full"
              {...register("block")}
            />
          </div>

          <div>
            <label className="label font-medium">Apartment No</label>
            <input
              type="text"
              readOnly
              className="input input-bordered w-full"
              {...register("apartmentNo")}
            />
          </div>

          <div>
            <label className="label font-medium">Rent</label>
            <input
              type="number"
              readOnly
              value={discountedRent ?? watch("rent")}
              className="input input-bordered w-full"
              {...register("rent")}
            />
          </div>

          <div>
            <label className="label font-medium">Month</label>
            <select
              className="select select-bordered w-full"
              {...register("month", { required: "Month is required" })}
            >
              <option value="">Select a month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            {errors.month && (
              <p className="text-error text-sm">{errors.month.message}</p>
            )}
          </div>
        </div>

        {/* Coupon section */}
        <div className="mt-4">
          <label className="label font-medium">Apply Coupon</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCouponApply}
              disabled={isValidatingCoupon}
            >
              Apply
            </button>
          </div>
          {couponMessage && (
            <p
              className={`mt-2 text-sm ${
                discountedRent ? "text-success" : "text-error"
              }`}
            >
              {couponMessage}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="text-center mt-6">
          <button type="submit" className="btn btn-primary w-full md:w-1/2">
            Pay Now
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default MakePayment;
