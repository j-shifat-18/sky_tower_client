import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ApartmentCard from './ApartmentCard';
import Pagination from './Pagination';
import SearchFilter from './SearchFilter';

const Apartments = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');

  const { data: apartments = [], isLoading } = useQuery({
    queryKey: ['apartments', page, minRent, maxRent],
    queryFn: async () => {
      const res = await axiosPublic.get(`/apartments?page=${page}&minRent=${minRent}&maxRent=${maxRent}`);
      return res.data;
    },
  });

  const agreementMutation = useMutation({
    mutationFn: async (apartment) => {
      const res = await axiosPublic.post('/agreements', apartment);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['apartments']);
    },
  });

  const handleAgreement = (apt) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      floor: apt.floor,
      block: apt.block,
      apartmentNo: apt.apartmentNo,
      rent: apt.rent,
      status: 'pending',
    };

    agreementMutation.mutate(agreementData);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Apartments</h2>
      <SearchFilter minRent={minRent} maxRent={maxRent} setMinRent={setMinRent} setMaxRent={setMaxRent} />

      {isLoading ? (
        <p>Loading apartments...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments?.rooms?.map((apt) => (
            <ApartmentCard key={apt._id} apartment={apt} onAgreement={handleAgreement} />
          ))}
        </div>
      )}

      <div className="mt-6">
        <Pagination page={page} setPage={setPage} totalPages={apartments?.totalPages || 1} />
      </div>
    </div>
  );
};

export default Apartments;
