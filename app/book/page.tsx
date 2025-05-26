"use client";

import { useState } from "react";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { InteractiveGrid } from "@/components/magicui/interactive-grid";
import { MagicCard } from "@/components/magicui/magic-card";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Container } from "@/components/magicui/container";

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: "",
    date: "",
    time: "",
    vehicleDetails: {
      type: "vin",
      value: "",
      state: "",
    },
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "vehicleType") {
      setBookingData((prev) => {
        const newType = value as "vin" | "plate";
        const resetFields = prev.vehicleDetails.type !== newType;
        return {
          ...prev,
          vehicleDetails: {
            type: newType,
            value: resetFields ? "" : prev.vehicleDetails.value,
            state: resetFields ? "" : prev.vehicleDetails.state,
          },
        };
      });
    } else if (name === "vin" || name === "plate") {
      setBookingData((prev) => ({
        ...prev,
        vehicleDetails: {
          ...prev.vehicleDetails,
          value: value,
        },
      }));
    } else if (name === "state") {
      setBookingData((prev) => ({
        ...prev,
        vehicleDetails: {
          ...prev.vehicleDetails,
          state: value,
        },
      }));
    } else {
      setBookingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission (will implement backend later)
    console.log("Booking Data:", bookingData);
    alert("Booking submitted (placeholder)");
    // Reset form or redirect
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600 mb-4">
              Step 1: Select Service
            </h2>
            {/* Placeholder for service selection */}
            <div className="mb-4">
              <label
                htmlFor="service"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Service
              </label>
              <select
                id="service"
                name="service"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={bookingData.service}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a service</option>
                <option value="oil-change">Oil Change</option>
                <option value="brake-repair">Brake Repair</option>
                <option value="tire-rotation">Tire Rotation</option>
                <option value="battery-check">Battery Check</option>
                {/* Add more services based on PRD */}
              </select>
            </div>
            <ShimmerButton
              type="button"
              onClick={nextStep}
              className="bg-blue-800 text-white font-bold py-2 px-4 rounded w-full mt-4"
            >
              Next
            </ShimmerButton>
          </div>
        );
      case 2:
        return (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600 mb-4">
              Step 2: Choose Date & Time
            </h2>
            {/* Placeholder for date and time selection */}
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={bookingData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="time"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={bookingData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex gap-2 mt-4">
              <ShimmerButton
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded w-full"
              >
                Previous
              </ShimmerButton>
              <ShimmerButton
                type="button"
                onClick={nextStep}
                className="bg-blue-800 text-white font-bold py-2 px-4 rounded w-full"
              >
                Next
              </ShimmerButton>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600 mb-4">
              Step 3: Vehicle Details
            </h2>
            {/* Placeholder for vehicle details */}
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Vehicle Identification
              </span>
              <div className="flex gap-4 mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="vehicleType"
                    value="vin"
                    checked={bookingData.vehicleDetails.type === "vin"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />{" "}
                  VIN
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="vehicleType"
                    value="plate"
                    checked={bookingData.vehicleDetails.type === "plate"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />{" "}
                  Plate + State
                </label>
              </div>
              {bookingData.vehicleDetails.type === "vin" ? (
                <div>
                  <label
                    htmlFor="vin"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    VIN
                  </label>
                  <input
                    type="text"
                    id="vin"
                    name="vin"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={bookingData.vehicleDetails.value}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ) : (
                <div>
                  <div className="mb-2">
                    <label
                      htmlFor="plate"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Plate Number
                    </label>
                    <input
                      type="text"
                      id="plate"
                      name="plate"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={bookingData.vehicleDetails.value}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={bookingData.vehicleDetails.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={bookingData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="flex gap-2 mt-4">
              <ShimmerButton
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded w-full"
              >
                Previous
              </ShimmerButton>
              <ShimmerButton
                type="submit"
                className="bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                Confirm Booking
              </ShimmerButton>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      <ScrollProgress color="#1e40af" />
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-20">
        <InteractiveGrid
          variant="lines"
          containerClassName="absolute inset-0"
          className="opacity-10"
        />
        <Container className="flex justify-center">
          <MagicCard className="w-full max-w-md" gradientOpacity={0.2}>
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg">
              <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600 mb-6">
                Book a Service
              </h1>
              <form onSubmit={handleSubmit}>{renderStep()}</form>
            </div>
          </MagicCard>
        </Container>
      </div>
    </div>
  );
}
