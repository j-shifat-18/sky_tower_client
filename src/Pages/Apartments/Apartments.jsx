import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import ApartmentCard from "../../Components/ApartmentCard/ApartmentCard";
import Pagination from "../../Components/Pagination/Pagination";
import SearchFilter from "../../Components/SearchFilter/SearchFilter";
import Loader from "../../Components/Loader/Loader";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Apartments = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure  = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  // Fetch apartments with filters and pagination
  const { data, isLoading } = useQuery({
    queryKey: ["apartments", currentPage, minRent, maxRent],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/apartments?page=${currentPage}&minRent=${minRent || 0}&maxRent=${
          maxRent || 999999
        }`
      );
      return res.data;
    },
  });

  // fetch agreement data
  const { data: userAgreement } = useQuery({
    queryKey: ["userAgreement", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements?email=${user.email}`);
      // console.log(res.data)
      return res.data;
    },
  });
  // console.log(userAgreement)

  // Handle agreement creation
  const agreementMutation = useMutation({
    mutationFn: async (apartment) => {
      const res = await axiosSecure.post("/agreements", apartment);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Agreement booked!",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["apartments"]);
    },
  });

  const handleAgreement = (apt) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      floor: apt.floor,
      block: apt.block,
      apartmentNo: apt.apartmentNo,
      rent: apt.rent,
      status: "pending",
    };

    agreementMutation.mutate(agreementData);
  };

  if (isLoading) return <Loader />;

  const { totalPages = 1, apartments = [] } = data || {};

  return (
    <div className="max-w-7xl mt-16 mx-auto p-4">
      <h2 className="text-4xl font-bold mb-4 md:mb-8 text-center text-primary">Available Apartments</h2>

      <SearchFilter
        minRent={minRent}
        maxRent={maxRent}
        setMinRent={setMinRent}
        setMaxRent={setMaxRent}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {apartments.length > 0 ? (
          apartments.map((apt) => (
            <ApartmentCard
              key={apt._id}
              apartment={apt}
              isApplied={userAgreement?.length >0 ? true : false}
              onAgreement={handleAgreement}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No apartments found for this filter.
          </p>
        )}
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Apartments;
