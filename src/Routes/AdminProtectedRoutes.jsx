import React from "react";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader/Loader";
import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AdminProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole, isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  if (!user || userRole?.role !== 'admin') {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }

  return children;
};

export default AdminProtectedRoutes;
