"use client";

import React, { useState } from "react";
export default function FAQ() {
  const faqData = [
    {
      question: "How do I pay my rent?",
      answer:
        "Log in to your Member Dashboard and go to the 'Make Payment' section. You can apply coupons if available and complete the payment securely.",
    },
    {
      question: "Can I use discount coupons?",
      answer:
        "Yes! Admins may provide discount coupons. Simply enter the coupon code during payment to reduce your rent.",
    },
    {
      question: "How do agreements work?",
      answer:
        "After selecting an apartment, you can submit an agreement request. The Admin will review and approve/reject it directly from their dashboard.",
    },
    {
      question: "Is SkyTower secure?",
      answer:
        "Yes. SkyTower uses Firebase Authentication, Firebase Admin SDK, and secure API routes to protect user data and payments.",
    },
    {
      question: "Can I access SkyTower on mobile?",
      answer:
        "Absolutely! SkyTower is fully responsive and works seamlessly on mobile, tablet, and desktop devices.",
    },
  ];
  return (
    <div className="w-full max-w-4xl my-12 mx-auto">
      <h1 className="text-4xl font-bold text-primary text-center">FAQ</h1>
      <p className="text-lg text-gray-600 mt-4 mb-10 text-center">
           Here are some common questions about SkyTower. If you still need help,
          feel free to contact our support team.
        </p>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}
function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-0.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-800">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center text-left p-4 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {question}
          </span>
          <span
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
