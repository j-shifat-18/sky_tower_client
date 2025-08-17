import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Loader/Loader";

const ApartmentDetails = () => {
  const { id } = useParams(); // dynamic route param like /apartments/:id
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic.get(`/apartments/${id}`)
      .then((res) => {
        setApartment(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);


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
      QueryClient.invalidateQueries(["apartments"]);
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

  if (loading) return <Loader></Loader>;
  if (!apartment) return <p className="text-center mt-10">Apartment not found</p>;

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 bg-base-100 rounded-2xl shadow-lg my-24"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Apartment Image */}
      <img
        src={apartment.image}
        alt={apartment.apartmentNo}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      {/* Basic Info */}
      <h2 className="text-2xl font-bold text-primary mb-2">
        Apartment {apartment.apartmentNo} - Block {apartment.block}
      </h2>
      <p className="text-gray-600 mb-4">{apartment.description}</p>

      {/* Grid Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Apartment Details</h3>
          <ul className="space-y-1 text-gray-700">
            <li><strong>Floor:</strong> {apartment.floor}</li>
            <li><strong>Size:</strong> {apartment.sizeSqFt} sq.ft</li>
            <li><strong>Bedrooms:</strong> {apartment.bedrooms}</li>
            <li><strong>Bathrooms:</strong> {apartment.bathrooms}</li>
            <li><strong>Balconies:</strong> {apartment.balconies}</li>
            <li><strong>Furnishing:</strong> {apartment.furnishing}</li>
            <li><strong>Availability:</strong> {apartment.availabilityStatus}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Rent & Fees</h3>
          <ul className="space-y-1 text-gray-700">
            <li><strong>Rent:</strong> ${apartment.rent} / month</li>
            <li><strong>Maintenance Fee:</strong> ${apartment.maintenanceFee}</li>
          </ul>

          <h3 className="font-semibold text-lg mt-4 mb-2">Owner Info</h3>
          <ul className="space-y-1 text-gray-700">
            <li><strong>Name:</strong> {apartment.ownerName}</li>
            <li><strong>Contact:</strong> {apartment.ownerContact}</li>
          </ul>
        </div>
      </div>

      {/* Utilities */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Utilities</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Electricity: {apartment.utilityInfo.electricity}</li>
          <li>Water Supply: {apartment.utilityInfo.waterSupply}</li>
          <li>Gas: {apartment.utilityInfo.gas}</li>
          <li>Internet: {apartment.utilityInfo.internet}</li>
        </ul>
      </div>

      {/* Amenities */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {apartment.amenities.map((amenity, i) => (
            <span key={i} className="px-3 py-1 bg-secondary text-white rounded-full text-sm">
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Nearby Facilities */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Nearby Facilities</h3>
        <ul className="list-disc list-inside text-gray-700">
          {apartment.nearbyFacilities.map((facility, i) => (
            <li key={i}>{facility}</li>
          ))}
        </ul>
      </div>

      {/* Date Listed */}
      <p className="mt-6 text-sm text-gray-500">
        Listed on: {new Date(apartment.dateListed).toLocaleDateString()}
      </p>

      <button onClick={()=>handleAgreement(apartment)} disabled={userAgreement?.length >0 ? true : false} className="btn btn-outline btn-primary block w-full mt-4">Agreement</button>
    </motion.div>
  );
};

export default ApartmentDetails;
