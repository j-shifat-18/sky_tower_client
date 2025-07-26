import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { FaSubway, FaBus, FaTaxi, FaParking } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SkyTowerLocation = () => {
  const position = [40.7128, -74.006]; // Manhattan coordinates

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-gray-800">Prime Location</h2>
        <p className="text-gray-500 mt-2">
          Located in the heart of downtown, SkyTower offers unparalleled access to the city's best amenities
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left - Directions and Address */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-4">
            {/* Getting Here List */}
            <div className="space-y-4">
              <LocationItem icon={<FaSubway />} title="Metro Station" desc="2 minutes walk" />
              <LocationItem icon={<FaBus />} title="Bus Stop" desc="1 minute walk" />
              <LocationItem icon={<FaTaxi />} title="Taxi Stand" desc="3 minutes walk" />
              <LocationItem icon={<FaParking />} title="Parking Garage" desc="On-site" />
            </div>

            {/* Address Card */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mt-6">
              <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
              <p className="font-bold text-lg text-gray-800">SkyTower Residences</p>
              <p className="text-sm text-gray-600">123 Downtown Boulevard</p>
              <p className="text-sm text-gray-600">Metropolitan City, MC 12345</p>
              <p className="text-sm text-gray-500 mt-2">GPS Coordinates: 40.7128, -74.0060</p>
            </div>
          </div>
        </motion.div>

        {/* Right - Map */}
        <motion.div
          className="rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="h-full w-full rounded-lg overflow-hidden">
            <MapContainer center={position} zoom={14} scrollWheelZoom={false} className="h-full w-full z-0">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>SkyTower Residences</Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LocationItem = ({ icon, title, desc }) => (
  <div className="flex items-center bg-white rounded-lg shadow border border-gray-200 p-4">
    <div className="text-blue-600 text-2xl mr-4">{icon}</div>
    <div>
      <h4 className="text-lg font-medium">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </div>
);

export default SkyTowerLocation;
