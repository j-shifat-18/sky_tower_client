// components/Banner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const bannerImages = [
  {
    url: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1470&q=80",
    title: "Luxury Apartments",
    desc: "Experience modern living in the heart of the city.",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1470&q=80",
    title: "Elegant Designs",
    desc: "Architecture that reflects excellence.",
  },
  {
    url: "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1470&q=80",
    title: "Comfort & Class",
    desc: "A perfect blend of comfort and sophistication.",
  },
];

const Banner = () => {
  return (
    <div className="w-full h-[85vh]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {bannerImages.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.url})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
                <div className="max-w-4xl px-6 lg:px-20">
                  <motion.h1
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {item.title}
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-xl text-gray-200 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    {item.desc}
                  </motion.p>
                  <motion.button
                    className="btn btn-primary shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore More
                  </motion.button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
