// ApartmentCard.jsx
import { motion } from "framer-motion";


const ApartmentCard = ({ apartment, onAgreement , isApplied }) => {
  const {
    _id,
    image,
    floor,
    block,
    apartmentNo,
    rent
  } = apartment;

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={image}
        alt={`Apartment ${apartmentNo}`}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Apartment No: {apartmentNo}</h2>
        <p className="text-gray-600">Floor: {floor}</p>
        <p className="text-gray-600">Block: {block}</p>
        <p className="text-gray-600">Rent: {rent} BDT</p>

        <button onClick={()=>onAgreement(apartment)} disabled={isApplied} className="btn btn-outline btn-primary block w-full">Agreement</button>
      </div>
    </motion.div>
  );
};

export default ApartmentCard;
