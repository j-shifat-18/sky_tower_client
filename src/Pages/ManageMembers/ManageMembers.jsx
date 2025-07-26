import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function ManageMembers() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get members only
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.filter((user) => user.role === "member");
    },
  });

  // console.log(members)

  // Mutation to downgrade role
  const { mutateAsync: removeMember } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/users?email=${email}`, {
        role: "user",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
      Swal.fire({
        icon: "success",
        title: "Success ! Member role changed to user!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleRemove = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be removed from member access!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeMember(email);
      }
    });
  };

  if (isLoading)
    return <span className="loading loading-spinner text-primary"></span>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Manage Members</h2>

      <div className="overflow-x-auto rounded-lg border border-base-200">
        <table className="table table-zebra">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleRemove(user.email)}
                    className="btn btn-sm btn-error text-white flex gap-1"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
