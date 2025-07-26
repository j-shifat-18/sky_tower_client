// components/dashboard/StatCard.jsx
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, title, value, color = 'text-primary' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-white dark:bg-base-100 rounded-xl shadow-md hover:shadow-xl transition-all p-4 flex items-center gap-4">
        <div className={`p-3 rounded-full bg-base-200 ${color}`}>
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">{title}</h4>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
