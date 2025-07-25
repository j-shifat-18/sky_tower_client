import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Megaphone, Info, Star } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function AnnouncementForm() {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (announcement) => {
      const res = await axiosSecure.post("/announcements", announcement);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Announcement posted successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      date: new Date().toISOString(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8 rounded-xl shadow-lg mt-10 space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center flex items-center justify-center gap-2 text-blue-600">
        <Megaphone className="w-6 h-6" /> Make Announcement
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="label">
            <span className="text-base font-medium flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" /> Title
            </span>
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter announcement title"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="text-base font-medium flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-green-500" /> Description
            </span>
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Enter announcement description"
            className="textarea textarea-bordered w-full h-32"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="text-base font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" /> Importance
              </span>
            </label>
            <select
              {...register("importance", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select importance</option>
              <option value="high">High</option>
              <option value="medium">Moderate</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="text-base font-medium flex items-center gap-2">
                <Info className="w-4 h-4 text-purple-500" /> Type
              </span>
            </label>
            <select
              {...register("type", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select type</option>
              <option value="General">Event</option>
              <option value="Urgent">Update</option>
              <option value="Security">Security</option>
              <option value="Informational">Informational</option>
            </select>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full md:w-1/2 text-white tracking-wide"
          >
            Submit Announcement
          </button>
        </div>
      </form>
    </motion.div>
  );
}
