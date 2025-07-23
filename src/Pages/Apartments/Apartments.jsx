import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import ApartmentCard from "../../Components/ApartmentCard/ApartmentCard";
import Pagination from "../../Components/Pagination/Pagination";
import SearchFilter from "../../Components/SearchFilter/SearchFilter";
import Loader from "../../Components/Loader/Loader";

const Apartments = () => {
  const axiosPublic = useAxiosPublic();
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
        `/apartments?page=${currentPage}&minRent=${minRent || 0}&maxRent=${maxRent || 999999}`
      );
      return res.data;
    },
  });

  // Handle agreement creation
  const agreementMutation = useMutation({
    mutationFn: async (apartment) => {
      const res = await axiosPublic.post("/agreements", apartment);
      return res.data;
    },
    onSuccess: () => {
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
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Apartments</h2>

      <SearchFilter
        minRent={minRent}
        maxRent={maxRent}
        setMinRent={setMinRent}
        setMaxRent={setMaxRent}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {apartments.length > 0 ? (
          apartments.map((apt) => (
            <ApartmentCard
              key={apt._id}
              apartment={apt}
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
