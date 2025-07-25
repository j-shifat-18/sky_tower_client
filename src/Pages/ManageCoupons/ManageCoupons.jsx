import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageCoupons = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: coupons = [] } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosPublic.get('/coupons');
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (coupon) => {
      const res = await axiosSecure.post('/coupons', coupon);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['coupons']);
      reset();
      setModalOpen(false);
      Swal.fire({ icon: 'success', title: 'Coupon added successfully!' });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Coupons</h2>
        <button
          className="btn btn-primary"
          onClick={() => setModalOpen(true)}
        >
          Add Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg p-5 shadow-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-white"
          >
            <h4 className="text-lg font-semibold mb-1">{coupon.title}</h4>
            <p className="text-3xl font-bold">{coupon.discount}% OFF</p>
            <p className="mb-2">{coupon.description}</p>
            <div className="flex justify-between items-center text-sm mb-3">
              <span className="bg-white text-indigo-600 px-2 py-1 rounded font-semibold">
                {coupon.code}
              </span>
              <span>Until {coupon.expiryDate}</span>
            </div>
            {/* <button className="btn btn-secondary w-full">Claim Offer</button> */}
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add Coupon</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register('title')}
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                required
              />
              <textarea
                {...register('description')}
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                required
              />
              <input
                {...register('code')}
                type="text"
                placeholder="Coupon Code"
                className="input input-bordered w-full"
                required
              />
              <input
                {...register('discount')}
                type="number"
                placeholder="Discount (%)"
                className="input input-bordered w-full"
                required
              />
              <input
                {...register('expiryDate')}
                type="date"
                className="input input-bordered w-full"
                required
              />
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCoupons;
