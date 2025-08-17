import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ContactForm from "./ContactForm";


// service_khpwwp3
// template_w2wbh9a


const Contact = () => {
  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Contact <span className="text-white/90">SkyTower</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg max-w-2xl mx-auto"
          >
            Have questions about apartments, rentals, or facilities? Reach out to us, and our team will respond promptly.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            icon: <FaPhoneAlt className="text-4xl text-primary mb-3" />,
            title: "Phone",
            info: ["+880 1612872485", "+880 1794668169"],
          },
          {
            icon: <FaEnvelope className="text-4xl text-primary mb-3" />,
            title: "Email",
            info: ["info.jahirulsifat.com", "info.skytower@gmail.com"],
          },
          {
            icon: <FaMapMarkerAlt className="text-4xl text-primary mb-3" />,
            title: "Address",
            info: ["SkyTower Complex", "Dhaka, Bangladesh"],
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="bg-base-200 rounded-3xl p-10 text-center shadow-lg hover:shadow-2xl transition"
          >
            {item.icon}
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            {item.info.map((line, i) => (
              <p key={i} className="text-gray-600">
                {line}
              </p>
            ))}
          </motion.div>
        ))}
      </section>

      {/* Contact Form + Image */}
      {/* <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-primary">Send Us a Message</h2>
          <p className="text-gray-600">
            Fill out the form below and our team will get back to you as soon as possible.
          </p>
          <form className="grid gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full h-32"
            ></textarea>
            <button className="btn btn-primary w-full">Send Message</button>
          </form>
        </motion.div>

        <motion.img
          src="https://i.ibb.co/DgV6nMHF/modern-mirror-building.jpg"
          alt="SkyTower Office"
          className="w-full h-[500px] rounded-2xl shadow-lg object-cover"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />
      </section> */}

      <ContactForm></ContactForm>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 text-center ">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Visit SkyTower Today
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-2xl mx-auto text-gray-100 mb-6"
        >
          Experience the luxury and modern lifestyle first-hand. Come and explore our premium apartments.
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

export default Contact;
