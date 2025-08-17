import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-sky-400 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            About SkyTower
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg max-w-3xl mx-auto"
          >
            A premium residential building that redefines modern living with world-class amenities,
            exceptional service, and a thriving community in the heart of the city.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src="https://i.ibb.co/DgV6nMHF/modern-mirror-building.jpg"
          alt="SkyTower Building"
          className="rounded-2xl shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-primary">Our Vision & Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At SkyTower, our vision is to create a sustainable, luxurious, and inclusive
            living environment that inspires modern lifestyles. We combine architectural
            excellence with smart technology to provide a seamless living experience.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to ensure residents enjoy a safe, connected, and enriching
            community while benefiting from top-notch facilities, round-the-clock support,
            and future-ready building management systems.
          </p>
        </motion.div>
      </section>

      {/* Key Highlights */}
      <section className="bg-base-200 py-20">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: "🏢",
              title: "45 Floors",
              desc: "Premium residential units across multiple floors",
            },
            {
              icon: "🛏️",
              title: "320 Units",
              desc: "Carefully designed apartments for modern living",
            },
            {
              icon: "🛡️",
              title: "24/7 Security",
              desc: "Round-the-clock surveillance & concierge services",
            },
            {
              icon: "🌆",
              title: "City View",
              desc: "Unparalleled views of the dynamic skyline",
            },
            {
              icon: "🏊",
              title: "Rooftop Pool",
              desc: "Infinity pool for relaxation and leisure",
            },
            {
              icon: "💼",
              title: "Smart Management",
              desc: "Automated rent, coupons, and agreement handling",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-6 bg-white shadow-lg rounded-2xl"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lifestyle & Amenities */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-primary">Lifestyle & Amenities</h2>
          <p className="text-gray-600 leading-relaxed">
            SkyTower isn’t just about living — it’s about experiencing a lifestyle.
            With rooftop infinity pools, gyms, community lounges, children’s play zones,
            and co-working spaces, every resident finds comfort and luxury in one place.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our concierge team, dedicated maintenance staff, and digital-first services
            ensure that residents enjoy both convenience and peace of mind.
          </p>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          src="https://imgs.search.brave.com/hVCOkw_CgiwUBlddPMXWSakffUbQHEf1iVQ5myP01Ek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzgwLzgxLzUz/LzM2MF9GXzEwODA4/MTUzODBfd1B2cTVs/UVdXNjNMOVpiNjUw/cmpiTDA1bGplTkZY/SXEuanBn"
          alt="Amenities"
          className="rounded-2xl shadow-lg"
        />
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4"
        >
          Experience Modern Living at SkyTower
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg mb-6"
        >
          Join a thriving community and discover the perfect balance of luxury and convenience.
        </motion.p>
        <motion.a
          href="/apartments"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white text-primary font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition"
        >
          Explore Apartments
        </motion.a>
      </section>
    </div>
  );
};

export default About;
