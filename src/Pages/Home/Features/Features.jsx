import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  Users,
  FileText,
  Megaphone,
  Building,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Secure & Reliable",
    description:
      "SkyTower uses Firebase Authentication, Admin SDK, and secure APIs to keep your data safe.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-primary" />,
    title: "Easy Rent Payments",
    description:
      "Pay your rent online with coupon support. Check payment history anytime with just a click.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Role-Based Dashboards",
    description:
      "Tailored dashboards for Users, Members, and Admins ensure everyone has the right tools.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Agreement Management",
    description:
      "Submit and manage agreements digitally with real-time admin approvals and tracking.",
  },
  {
    icon: <Megaphone className="w-8 h-8 text-primary" />,
    title: "Real-Time Announcements",
    description:
      "Stay updated with instant announcements directly on your dashboard—never miss an update.",
  },
  {
    icon: <Building className="w-8 h-8 text-primary" />,
    title: "Apartment Management",
    description:
      "Easily browse available apartments, view details, and manage agreements all in one place.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-primary"
        >
          Everything You Need, All in One Place
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center text-gray-600 max-w-2xl mx-auto"
        >
          SkyTower brings all the essential tools you need to manage apartments,
          members, and payments—all in one secure platform.
        </motion.p>

        {/* Features Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-base-200 rounded-2xl shadow-md hover:shadow-lg border border-base-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
