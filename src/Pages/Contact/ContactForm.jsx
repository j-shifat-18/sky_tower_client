import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactFormSection = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    emailjs
      .sendForm(
        "service_khpwwp3",    
        "template_w2wbh9a",   
        form.current,
        "cfMNyisU4FAmsHZqW"   
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess("Message sent successfully!");
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setSuccess("Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
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

        <form ref={form} onSubmit={sendEmail} className="grid gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="input input-bordered w-full"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="textarea textarea-bordered w-full h-32"
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {success && <p className="mt-2 text-sm text-green-500">{success}</p>}
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
    </section>
  );
};

export default ContactFormSection;
