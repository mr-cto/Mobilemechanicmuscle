import React from "react";
import Image from "next/image";

export default function ServicesPage() {
  const services = [
    {
      name: "Oil Change",
      description:
        "Regular and synthetic oil changes to keep your engine running smoothly.",
      icon: "/assets/logo.png", // Placeholder, replace with actual icons
    },
    {
      name: "Brake Repair",
      description:
        "Comprehensive brake inspection, repair, and replacement services.",
      icon: "/assets/logo.png",
    },
    {
      name: "Tire Rotation",
      description:
        "Extend the life of your tires with professional rotation and balancing.",
      icon: "/assets/logo.png",
    },
    {
      name: "Battery Check & Replacement",
      description:
        "Testing and replacement of car batteries to ensure reliable starts.",
      icon: "/assets/logo.png",
    },
    {
      name: "Diagnostic Services",
      description:
        "Advanced diagnostics to accurately identify and resolve vehicle issues.",
      icon: "/assets/logo.png",
    },
    {
      name: "Pre-Purchase Inspection",
      description:
        "Thorough inspection of a vehicle before purchase to ensure its condition.",
      icon: "/assets/logo.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <Image
              src={service.icon}
              alt={service.name}
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {service.name}
            </h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
