"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/magicui/container";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { InteractiveGrid } from "@/components/magicui/interactive-grid";
import { MorphingText } from "@/components/magicui/morphing-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { MagicCard } from "@/components/magicui/magic-card";
import GoogleReviews from "@/components/GoogleReviews";
import {
  FaOilCan,
  FaCarCrash,
  FaSyncAlt,
  FaCarBattery,
  FaPlayCircle,
} from "react-icons/fa";

interface FormData {
  fullName: string;
  vehicleIdentification: {
    type: "vin" | "plate";
    value: string;
    state: string; // only required if type is 'plate'
  };
  email: string;
  serviceRequest: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    vehicleIdentification: { type: "vin", value: "", state: "" },
    email: "",
    serviceRequest: "",
  });
  const [status, setStatus] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Entrance animation with a slight delay
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        vehicleIdentification: {
          ...prev.vehicleIdentification,
          type: value as "vin" | "plate",
          value: "",
          state: "",
        },
      }));
    } else if (name === "vin" || name === "plate" || name === "state") {
      setFormData((prev) => ({
        ...prev,
        vehicleIdentification: {
          ...prev.vehicleIdentification,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-form", {
        // Assuming this is the correct endpoint for the hero form
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          serviceRequest: formData.serviceRequest,
          // Include vehicleInfo if you add it to the FormData interface and state
        }),
      });

      if (res.ok) {
        setStatus("Sent successfully! We'll be in touch.");
        setFormData({
          fullName: "",
          vehicleIdentification: { type: "vin", value: "", state: "" }, // Reset if needed
          email: "",
          serviceRequest: "",
        });
      } else {
        setStatus("Failed to send. Please try again.");
      }
    } catch (err) {
      setStatus("Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <ScrollProgress color="#1e40af" />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-4 overflow-hidden">
        <InteractiveGrid
          variant="lines"
          containerClassName="absolute inset-0 z-0"
          className="opacity-20"
        />
        <Container className="flex flex-col md:flex-row items-center justify-between relative z-10">
          {/* Left Side - Headline and CTA */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              <MorphingText
                texts={[
                  "Expert mobile mechanics",
                  "Professional auto repair",
                  "Your car, our priority",
                  "Service at your location",
                ]}
                duration={3000}
                className="bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-300"
              />
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fadeInUp delay-100">
              We come to you, we fix your car. Get expert service at your
              location.
            </p>
            <div className="flex justify-center md:justify-start items-center space-x-4 animate-fadeInUp delay-200">
              <ShimmerButton
                onClick={() => (window.location.href = "/book")}
                className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full text-lg"
              >
                Book Online Now
              </ShimmerButton>
              <button className="flex items-center bg-transparent text-white font-semibold py-3 px-6 rounded-full text-lg transition-colors duration-300 hover:bg-white hover:text-blue-800">
                <FaPlayCircle className="mr-2" /> Watch Intro
              </button>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-xl animate-fadeInRight delay-300">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Get Your Car Repaired - We Come to You
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Your name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Your email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Phone number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  name="phone"
                  type="tel"
                  // value={...} // Add to FormData if needed
                  // onChange={...}
                  placeholder="e.g., (123) 456-7890"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="serviceRequest"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Select Services
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="serviceRequest"
                  name="serviceRequest"
                  value={formData.serviceRequest}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="mobile-repairs">Mobile Repairs</option>
                  <option value="diagnostics">Diagnostic Services</option>
                  <option value="oil-change">Oil Change</option>
                  <option value="brake-repair">Brake Service</option>
                  <option value="tire-service">Tire Service</option>
                  <option value="battery">Battery Service</option>
                  <option value="cosmetic">
                    Cosmetic Enhancements & Detailing
                  </option>
                  <option value="performance">Performance Upgrades</option>
                  <option value="transmission">Transmission Service</option>
                  <option value="electrical">Electrical Repairs</option>
                  <option value="engine">Engine Repairs</option>
                  <option value="other">Other Services</option>
                </select>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out transform hover:scale-105 w-full ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-pulse">
                      Sending...
                    </span>
                  ) : (
                    "MAKE APPOINTMENT"
                  )}
                </button>
              </div>
              {status && (
                <p
                  className={`text-sm mt-4 text-center ${
                    status.includes("success")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </Container>
      </div>

      {/* Statistics Section */}
      <MagicCard className="w-full py-12" gradientOpacity={0.2}>
        <div className="bg-yellow-300/90 backdrop-blur-sm w-full">
          <Container className="flex flex-col md:flex-row justify-around items-center text-gray-800">
            <div className="mb-6 md:mb-0">
              <p className="text-4xl font-bold">1.2K+</p>
              <p className="text-lg">Satisfied Customer</p>
            </div>
            <div>
              <p className="text-4xl font-bold">2K+</p>
              <p className="text-lg">Completed Projects</p>
            </div>
          </Container>
        </div>
      </MagicCard>

      {/* Existing content below the hero/stats - adjust styling as needed */}
      <Container className="mt-12 p-4">
        {/* Service Icons */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Services Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MagicCard
              className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg"
              gradientOpacity={0.15}
            >
              <div className="flex flex-col items-center">
                <FaOilCan className="w-16 h-16 text-blue-800 mb-3" />
                <p className="text-xl font-semibold text-gray-800">
                  Oil Change
                </p>
              </div>
            </MagicCard>

            <MagicCard
              className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg"
              gradientOpacity={0.15}
            >
              <div className="flex flex-col items-center">
                <FaCarCrash className="w-16 h-16 text-blue-800 mb-3" />
                <p className="text-xl font-semibold text-gray-800">
                  Brake Repair
                </p>
              </div>
            </MagicCard>

            <MagicCard
              className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg"
              gradientOpacity={0.15}
            >
              <div className="flex flex-col items-center">
                <FaSyncAlt className="w-16 h-16 text-blue-800 mb-3" />
                <p className="text-xl font-semibold text-gray-800">
                  Tire Rotation
                </p>
              </div>
            </MagicCard>

            <MagicCard
              className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg"
              gradientOpacity={0.15}
            >
              <div className="flex flex-col items-center">
                <FaCarBattery className="w-16 h-16 text-blue-800 mb-3" />
                <p className="text-xl font-semibold text-gray-800">
                  Battery Check
                </p>
              </div>
            </MagicCard>
          </div>
        </div>

        {/* Google Reviews */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            What Our Customers Say
          </h2>
          <GoogleReviews />
        </div>

        {/* Trust-Badge Strip */}
        <MagicCard className="mb-12" gradientOpacity={0.15}>
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Trusted By
            </h2>
            <div className="flex justify-around items-center flex-wrap gap-6">
              <Image
                src="/assets/logo.png" // Replace with actual trust badge images
                alt="Trust Badge 1"
                width={80}
                height={80}
                className="opacity-75"
              />
              <Image
                src="/assets/logo.png"
                alt="Trust Badge 2"
                width={80}
                height={80}
                className="opacity-75"
              />
              <Image
                src="/assets/logo.png"
                alt="Trust Badge 3"
                width={80}
                height={80}
                className="opacity-75"
              />
              {/* Add more trust badges as needed */}
            </div>
          </div>
        </MagicCard>

        {/* Existing descriptive text */}
        <MagicCard className="max-w-3xl mx-auto" gradientOpacity={0.1}>
          <div className="text-center text-gray-700 p-8 bg-white/80 backdrop-blur-sm rounded-lg">
            <p className="mb-4 text-lg">
              Mobile Mechanic Muscle provides convenient mobile automotive
              services including repairs, cosmetic enhancements, and performance
              upgrades directly at your location.
            </p>
            <p className="text-md">
              Visit our{" "}
              <a
                href="https://mobilemechanicmusclenearme.com/en-us/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-yellow-400 font-semibold transition-colors duration-300"
                style={{ color: "#1e40af" }}
              >
                official website
              </a>{" "}
              for more information about our services.
            </p>
          </div>
        </MagicCard>
      </Container>
    </div>
  );
}
