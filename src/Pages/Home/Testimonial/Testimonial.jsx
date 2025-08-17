"use client";

import React from 'react';
function Testimonial() {
  const testimonials = [
  {
    name: "Jonathan Yombo",
    title: "Apartment Member",
    text: "Paying rent through SkyTower is so smooth. I even used a discount coupon, and it worked perfectly. No more hassles with manual payments!",
    image: "https://i.postimg.cc/W1rCvYnT/nazmul-hossain.jpg"
  },
  {
    name: "Yves Kakume",
    title: "Resident",
    text: "I love how easy it is to check announcements directly from my dashboard. I never miss any updates from the admin.SkyTower gives me a bird’s-eye view of my building.",
    image: "https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg"
  },
  {
    name: "Yucel Farukşahan",
    title: "Building Admin",
    text: "Managing agreements, members, and coupons has become effortless. SkyTower gives me full control without complexity.As someone new to digital platforms, I found SkyTower really simple to use. From registration to rent payment, everything is straightforward.",
    image: "https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg"
  },
  {
    name: "Anonymous Resident",
    title: "Tenant",
    text: "As someone new to digital platforms, I found SkyTower really simple to use. From registration to rent payment, everything is straightforward.",
    image: "https://i.pinimg.com/1200x/c2/4e/27/c24e271f2f992fd7e62e8c1e8d9b3e2f.jpg"
  },
  {
    name: "Shekinah Tshikulila",
    title: "Apartment Member",
    text: "The payment history feature is a lifesaver! I can always check when and how much I paid, without keeping manual records.As someone new to digital platforms, I found SkyTower really simple to use. From registration to rent payment, everything is straightforward.The member dashboard makes everything so organized. I can see my rented apartment info, announcements, and payments in one place.",
    image: "https://i.pinimg.com/736x/81/d6/b1/81d6b158728f5fc97ca6e0a025fefee0.jpg"
  },
  {
    name: "Khatab Wedaa",
    title: "New Resident",
    text: "Booking and moving into my apartment was so easy with SkyTower. The agreement approval system is quick and transparent.",
    image: "https://i.pinimg.com/736x/9f/46/74/9f4674ca9c17330ab419c1b2f5951d9a.jpg"
  },
  {
    name: "Oketa Fred",
    title: "Fullstack Developer & Resident",
    text: "As a tech-savvy tenant, I was impressed by the clean UI and fast performance. SkyTower feels like a modern app, not a boring old system.SkyTower gives me a bird’s-eye view of my building. I can monitor everything—members, payments, and agreements—on one platform.",
    image: "https://i.pinimg.com/736x/57/3c/80/573c80967c9429d0ed0ce32701f85b70.jpg"
  },
  {
    name: "Rodrigo Aguilar",
    title: "Member",
    text: "The member dashboard makes everything so organized. I can see my rented apartment info, announcements, and payments in one place.",
    image: "https://i.pinimg.com/736x/b0/c4/21/b0c421e77cf563962026ade82c90dd5b.jpg"
  },
  {
    name: "Zeki",
    title: "Building Manager",
    text: "Finally, a system that makes management easy. I can approve agreements, manage users, and even control coupon availability in real time.",
    image: "https://i.pinimg.com/736x/ce/31/42/ce3142d7a968fff3aecd0100572a5e8b.jpg"
  },
  {
    name: "Eric Ampire",
    title: "Resident",
    text: "SkyTower gives me peace of mind. Payments are secure, and I always get confirmation instantly. Highly recommend it for any building.",
    image: "https://i.pinimg.com/736x/79/63/a5/7963a5246188d408b8f28961a0cf2b90.jpg"
  },
  {
    name: "Roland Tubonge",
    title: "Tenant",
    text: "I like how responsive SkyTower is. I can access it from my phone anytime—pay rent or check updates on the go.",
    image: "https://i.pinimg.com/1200x/08/a2/41/08a2413b771b729a9f9df20fa97be52a.jpg"
  },
  {
    name: "Jane Doe",
    title: "Resident",
    text: "The system looks clean and professional. Even as a non-technical user, I had no problem navigating my profile and payments.SkyTower gives me a bird’s-eye view of my building. I can monitor everything—members, payments, and agreements—on one platform.",
    image: "https://i.pinimg.com/736x/b0/7b/cc/b07bcc19e5d06dfb888c3263724b8baa.jpg"
  },
  {
    name: "John Smith",
    title: "Apartment Member",
    text: "I was able to search apartments by rent range and quickly find one within my budget. Very user-friendly!",
    image: "https://i.pinimg.com/736x/12/ec/d9/12ecd918607b1ccb9d46772435bb592f.jpg"
  },
  {
    name: "Alice Johnson",
    title: "Resident",
    text: "The announcements section keeps me updated about everything happening in the building—no more missed notices!",
    image: "https://i.pinimg.com/1200x/e2/f5/bc/e2f5bc45bd9d07946c9453cfb48747ea.jpg"
  },
  {
    name: "Bob Williams",
    title: "System Admin",
    text: "The role-based access control is solid. Users, members, and admins each have the right tools at their fingertips.",
    image: "https://i.pinimg.com/1200x/50/47/d2/5047d259f0d8b3d652b7d3dfa3479139.jpg"
  },
  {
    name: "Charlie Brown",
    title: "Member",
    text: "Payment history and rent tracking help me stay organized. I no longer worry about forgetting due dates.",
    image: "https://i.pinimg.com/736x/bb/87/18/bb87180897cb4cb694cd692966a0ab15.jpg"
  },
  {
    name: "Diana Prince",
    title: "Building Owner",
    text: "SkyTower gives me a bird’s-eye view of my building. I can monitor everything—members, payments, and agreements—on one platform.",
    image: "https://i.pinimg.com/1200x/fb/c3/03/fbc30308d8f36a5566cbf0a535c14322.jpg"
  },
  {
    name: "Eve Adams",
    title: "Resident",
    text: "The system is super fast and responsive. I even got a rent reminder notification which was very helpful.",
    image: "https://i.pinimg.com/1200x/de/11/d2/de11d2f9df4295493625189e9cb829ce.jpg"
  }
];

  const anonymousFallbackImage = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";
  return <div className=" flex flex-col items-center bg-base-200 py-16 px-4 sm:px-6 lg:px-8">
      {}
      <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-center max-w-4xl leading-tight text-primary">
        Loved by community
      </h1>

      {}
      <p className="text-lg text-gray-500 mt-4 text-center max-w-3xl mb-16">
        Hear from our residents and admins who use SkyTower every day. Real experiences, real convenience.
      </p>

      {}
      <div className="w-full max-w-7xl columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">

        {testimonials.map((testimonial, index) => <div key={index} className="bg-white dark:bg-black p-6 rounded-xl shadow-md break-inside-avoid border border-gray-200 dark:border-gray-800">
            <div className="flex items-center mb-4">
              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" onError={e => {
            const target = e.target;
            target.onerror = null;
            target.src = anonymousFallbackImage;
          }} />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
              </div>
            </div>
            <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
              {testimonial.text}
            </p>
          </div>)}
      </div>
    </div>;
}
export default Testimonial;