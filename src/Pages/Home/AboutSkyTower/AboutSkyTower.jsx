import { motion } from 'framer-motion';

const AboutSkyTower = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl  font-bold text-primary mb-2">About SkyTower</h2>
        <p className="text-lg text-gray-600 mt-4">
          A premium residential building that redefines modern living with exceptional amenities<br />
          and unparalleled service
        </p>
      </motion.div>

      {/* Main Grid Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid lg:grid-cols-2 gap-12 mt-16 text-left items-center"
      >
        {/* Image */}
        <img
          src="https://i.ibb.co/DgV6nMHF/modern-mirror-building.jpg"
          alt="Skytower Glass Building"
          className="w-full max-h-[450px] object-cover rounded-lg shadow-lg"
        />

        {/* Text Content */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Architectural Excellence</h3>
            <p className="text-gray-600">
              SkyTower stands as a testament to contemporary architectural brilliance, featuring
              a sleek glass facade that reflects the dynamic city skyline. Our 45-story tower
              incorporates sustainable design principles with energy-efficient systems and
              premium materials throughout.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">Premium Amenities</h3>
            <p className="text-gray-600">
              Residents enjoy access to world-class amenities including a rooftop infinity pool,
              state-of-the-art fitness center, concierge services, and private dining areas. Our
              building features 24/7 security, valet parking, and dedicated maintenance staff.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">Community Living</h3>
            <p className="text-gray-600">
              More than just a residence, SkyTower fosters a vibrant community where neighbors
              become friends. Regular social events, co-working spaces, and shared amenities
              create opportunities for meaningful connections.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid sm:grid-cols-3 gap-8 mt-20"
      >
        <div className="flex flex-col items-center">
          <div className="bg-blue-300 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3">
            🏢
          </div>
          <h4 className="text-lg font-semibold">45 Floors</h4>
          <p className="text-gray-500 text-sm text-center">
            Premium residential units across multiple floors
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-blue-300 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3">
            🛏️
          </div>
          <h4 className="text-lg font-semibold">320 Units</h4>
          <p className="text-gray-500 text-sm text-center">
            Carefully designed apartments for modern living
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-blue-300 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3">
            🛡️
          </div>
          <h4 className="text-lg font-semibold">24/7 Security</h4>
          <p className="text-gray-500 text-sm text-center">
            Round-the-clock security and concierge services
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSkyTower;
