"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaOilCan, FaCarCrash, FaSyncAlt, FaCarBattery } from "react-icons/fa";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          ...(name === "vin" && { value: value }),
          ...(name === "plate" && { value: value }),
          ...(name === "state" && { state: value }),
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Sent successfully");
        setFormData({
          fullName: "",
          vehicleIdentification: { type: "vin", value: "", state: "" },
          email: "",
          serviceRequest: "",
        });
      } else {
        setStatus("Failed to send");
      }
    } catch (err) {
      setStatus("Failed to send");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      <div
        className={`w-full max-w-md mb-6 flex justify-center transition-all duration-500 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Image
          src="/assets/logo.png"
          alt="Mobile Mechanic Muscle Logo"
          width={200}
          height={200}
          className="rounded-full shadow-lg border-4"
          style={{ borderColor: "#41e0c8" }}
          priority
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md border border-gray-200 transition-all duration-500 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
            style={{ color: "#222" }}
          >
            We come to you, we fix your car.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Convenient mobile automotive services directly at your location.
          </p>
          <a
            href="tel:+1-555-555-5555"
            className="inline-block bg-blue-800 hover:bg-yellow-400 hover:text-blue-900 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: "#1e40af", color: "#fff" }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#fbbf24";
              e.currentTarget.style.color = "#1e40af";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#1e40af";
              e.currentTarget.style.color = "#fff";
            }}
          >
            CALL NOW
          </a>
        </div>
        <h2
          className="text-2xl mb-4 font-bold text-center text-gray-900"
          style={{ color: "#222" }}
        >
          Service Request
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="fullName"
            style={{ color: "#222" }}
          >
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline border-gray-300 focus:border-blue-800 transition duration-300"
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={{ color: "#222" }}
          />
        </div>
        <div className="mb-4">
          <span
            className="block text-gray-900 text-sm font-bold mb-2"
            style={{ color: "#222" }}
          >
            Vehicle Identification
          </span>
          <div
            className="flex gap-4 mb-2"
            role="radiogroup"
            aria-label="Vehicle Identification"
          >
            <label
              className={`flex-1 flex items-center justify-center cursor-pointer px-4 py-2 rounded-lg border transition-all duration-300 ease-in-out select-none transform hover:scale-105 active:scale-95
                ${
                  formData.vehicleIdentification.type === "vin"
                    ? "border-blue-800 bg-blue-800 text-white shadow font-semibold"
                    : "border-gray-300 bg-white text-gray-900 hover:border-blue-600"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-400
              `}
              tabIndex={0}
              htmlFor="vin-radio"
              style={
                formData.vehicleIdentification.type === "vin"
                  ? {
                      backgroundColor: "#1e40af",
                      borderColor: "#1e40af",
                      color: "#fff",
                    }
                  : { color: "#222" }
              }
            >
              <input
                id="vin-radio"
                type="radio"
                name="type"
                value="vin"
                checked={formData.vehicleIdentification.type === "vin"}
                onChange={handleChange}
                className="sr-only"
                aria-checked={formData.vehicleIdentification.type === "vin"}
              />
              <span>VIN</span>
            </label>
            <label
              className={`flex-1 flex items-center justify-center cursor-pointer px-4 py-2 rounded-lg border transition-all duration-300 ease-in-out select-none transform hover:scale-105 active:scale-95
                ${
                  formData.vehicleIdentification.type === "plate"
                    ? "border-blue-800 bg-blue-800 text-white shadow font-semibold"
                    : "border-gray-300 bg-white text-gray-900 hover:border-blue-600"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-400
              `}
              tabIndex={0}
              htmlFor="plate-radio"
              style={
                formData.vehicleIdentification.type === "plate"
                  ? {
                      backgroundColor: "#1e40af",
                      borderColor: "#1e40af",
                      color: "#fff",
                    }
                  : { color: "#222" }
              }
            >
              <input
                id="plate-radio"
                type="radio"
                name="type"
                value="plate"
                checked={formData.vehicleIdentification.type === "plate"}
                onChange={handleChange}
                className="sr-only"
                aria-checked={formData.vehicleIdentification.type === "plate"}
              />
              <span>Plate + State</span>
            </label>
          </div>
          <div className="transition-all duration-500 ease-in-out min-h-[112px] overflow-hidden">
            {formData.vehicleIdentification.type === "vin" ? (
              <div className="animate-fadeIn transition-all duration-300">
                <label
                  className="block text-gray-900 text-sm font-bold mb-2"
                  htmlFor="vin"
                  style={{ color: "#222" }}
                >
                  VIN
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline border-gray-300 focus:border-blue-800 transition duration-300"
                  id="vin"
                  name="vin"
                  type="text"
                  value={formData.vehicleIdentification.value}
                  onChange={handleChange}
                  required
                  style={{ color: "#222" }}
                />
              </div>
            ) : (
              <div className="animate-fadeIn transition-all duration-300">
                <div className="mb-2">
                  <label
                    className="block text-gray-900 text-sm font-bold mb-2"
                    htmlFor="plate"
                    style={{ color: "#222" }}
                  >
                    Plate Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline border-gray-300 focus:border-blue-800 transition duration-300"
                    id="plate"
                    name="plate"
                    type="text"
                    value={formData.vehicleIdentification.value}
                    onChange={handleChange}
                    required
                    style={{ color: "#222" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-900 text-sm font-bold mb-2"
                    htmlFor="state"
                    style={{ color: "#222" }}
                  >
                    State
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline border-gray-300 focus:border-blue-800 transition duration-300"
                    id="state"
                    name="state"
                    type="text"
                    value={formData.vehicleIdentification.state}
                    onChange={handleChange}
                    required
                    style={{ color: "#222" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="email"
            style={{ color: "#222" }}
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline border-gray-300 focus:border-blue-800 transition duration-300"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ color: "#222" }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="serviceRequest"
            style={{ color: "#222" }}
          >
            Service Request
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline border-gray-300 focus:border-blue-800 transition duration-300"
            id="serviceRequest"
            name="serviceRequest"
            value={formData.serviceRequest}
            onChange={handleChange}
            required
            style={{ color: "#222" }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`relative bg-blue-800 hover:bg-yellow-400 hover:text-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
              isSubmitting ? "opacity-75" : ""
            }`}
            type="submit"
            style={{ backgroundColor: "#1e40af", color: "#fff" }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#fbbf24";
              e.currentTarget.style.color = "#1e40af";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#1e40af";
              e.currentTarget.style.color = "#fff";
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block animate-pulse">Sending...</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
          <p
            className={`text-sm ${
              status === "Sent successfully"
                ? "text-green-600"
                : "text-gray-600"
            } transition-all duration-300`}
            data-testid="status"
          >
            {status}
          </p>
        </div>
      </form>

      <div
        className={`mt-6 w-full max-w-md text-center text-gray-700 transition-all duration-700 ease-out transform ${
          isVisible
            ? "opacity-100 translate-y-0 delay-200"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* Service Icons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex flex-col items-center">
            <FaOilCan className="w-12 h-12 text-blue-800 mb-2" />
            <p className="text-sm font-semibold">Oil Change</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCarCrash className="w-12 h-12 text-blue-800 mb-2" />
            <p className="text-sm font-semibold">Brake Repair</p>
          </div>
          <div className="flex flex-col items-center">
            <FaSyncAlt className="w-12 h-12 text-blue-800 mb-2" />
            <p className="text-sm font-semibold">Tire Rotation</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCarBattery className="w-12 h-12 text-blue-800 mb-2" />
            <p className="text-sm font-semibold">Battery Check</p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-inner mb-8">
          <p className="text-gray-800 italic mb-4">
            "Mobile Mechanic Muscle saved my day! Quick, professional, and they
            fixed my car right in my driveway. Highly recommend!"
          </p>
          <p className="text-gray-900 font-semibold">- Happy Customer</p>
        </div>

        {/* Trust-Badge Strip */}
        <div className="flex justify-around items-center mb-8">
          <Image
            src="/assets/logo.png"
            alt="Trust Badge 1"
            width={60}
            height={60}
            className="opacity-75"
          />
          <Image
            src="/assets/logo.png"
            alt="Trust Badge 2"
            width={60}
            height={60}
            className="opacity-75"
          />
          <Image
            src="/assets/logo.png"
            alt="Trust Badge 3"
            width={60}
            height={60}
            className="opacity-75"
          />
        </div>

        <p className="mb-2">
          Mobile Mechanic Muscle provides convenient mobile automotive services
          including repairs, cosmetic enhancements, and performance upgrades
          directly at your location.
        </p>
        <p className="text-sm">
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
    </div>
  );
}
