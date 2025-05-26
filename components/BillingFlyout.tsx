"use client";

import { useState, useEffect, useRef } from "react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { flyoutStyles } from "@/components/header/styles";
import { X } from "lucide-react";

type BillingFlyoutProps = {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "pay" | "lookup";
  anchorRef?: React.RefObject<HTMLElement | null>;
};

export function BillingFlyout({
  isOpen,
  onClose,
  initialTab = "pay",
  anchorRef,
}: BillingFlyoutProps) {
  const [activeTab, setActiveTab] = useState<"pay" | "lookup">(initialTab);
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);

  // Close flyout when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(event.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  // Handle ESC key to close flyout
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // Reset state when flyout is closed
  useEffect(() => {
    if (!isOpen) {
      setBookingId("");
      setEmail("");
      setError("");
      setSuccess(false);
      setBookingDetails(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setBookingDetails(null);

    try {
      const response = await fetch("/api/bill-pay/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to find booking");
      }

      setBookingDetails(data.booking);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bill-pay/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingDetails.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }

      setSuccess(true);
      setBookingDetails(null);
    } catch (err: any) {
      setError(err.message || "Payment processing failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={flyoutRef}
      className={`${flyoutStyles.panel} absolute right-0 top-full mt-2 w-96 max-h-[80vh] overflow-y-auto z-50`}
      style={{
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.3s ease, transform 0.3s ease, visibility 0.3s",
      }}
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "pay"
                ? "text-white border-b-2 border-[#9E7AFF]"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("pay")}
          >
            Pay Bill
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "lookup"
                ? "text-white border-b-2 border-[#9E7AFF]"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("lookup")}
          >
            Invoice Lookup
          </button>
        </div>

        <div className="p-5">
          {!success ? (
            <>
              {!bookingDetails ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-white">
                    {activeTab === "pay"
                      ? "Pay Your Bill"
                      : "Find Your Invoice"}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="bookingId"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Booking ID
                      </label>
                      <input
                        type="text"
                        id="bookingId"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#9E7AFF] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#9E7AFF] focus:border-transparent"
                        required
                      />
                    </div>
                    <ShimmerButton
                      type="submit"
                      className="w-full py-2.5"
                      disabled={loading}
                    >
                      {loading ? "Searching..." : "Find My Invoice"}
                    </ShimmerButton>
                    {error && (
                      <p className="text-red-400 text-sm mt-2">{error}</p>
                    )}
                  </form>
                </div>
              ) : (
                <div>
                  {activeTab === "pay" ? (
                    // Bill Pay Details View
                    <>
                      <h2 className="text-2xl font-semibold mb-6 text-white">
                        Invoice Details
                      </h2>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                          <span className="text-gray-400">Service Date:</span>
                          <span className="text-white font-medium">
                            {new Date(
                              bookingDetails.appointmentDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                          <span className="text-gray-400">Customer:</span>
                          <span className="text-white font-medium">
                            {bookingDetails.customerName}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                          <span className="text-gray-400">Vehicle:</span>
                          <span className="text-white font-medium">
                            {bookingDetails.vehicleYear}{" "}
                            {bookingDetails.vehicleMake}{" "}
                            {bookingDetails.vehicleModel}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                          <span className="text-gray-400">Status:</span>
                          <span
                            className={`font-medium ${
                              bookingDetails.status === "completed"
                                ? "text-green-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {bookingDetails.status.charAt(0).toUpperCase() +
                              bookingDetails.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-2">
                          <span className="text-gray-400">Payment Status:</span>
                          <span
                            className={`font-medium ${
                              bookingDetails.isPaid
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {bookingDetails.isPaid ? "Paid" : "Unpaid"}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-white font-semibold text-lg">
                            Total Amount:
                          </span>
                          <span className="text-white font-bold text-lg">
                            ${bookingDetails.totalAmount}
                          </span>
                        </div>
                      </div>

                      {!bookingDetails.isPaid && (
                        <div className="mt-6">
                          <ShimmerButton
                            onClick={handlePayment}
                            className="w-full py-2.5"
                            disabled={loading}
                          >
                            {loading ? "Processing..." : "Pay Now"}
                          </ShimmerButton>
                          {error && (
                            <p className="text-red-400 text-sm mt-2">{error}</p>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    // Invoice Lookup Details View
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-white">
                          Invoice #{bookingDetails.id}
                        </h2>
                        <button
                          onClick={() => window.print()}
                          className="flex items-center gap-2 text-[#9E7AFF] hover:text-[#FE8BBB] transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                            />
                          </svg>
                          Print
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">
                            Customer Information
                          </h3>
                          <p className="text-white font-medium">
                            {bookingDetails.customerName}
                          </p>
                          <p className="text-gray-300">
                            {bookingDetails.customerEmail}
                          </p>
                          {bookingDetails.customerPhone && (
                            <p className="text-gray-300">
                              {bookingDetails.customerPhone}
                            </p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">
                            Service Date
                          </h3>
                          <p className="text-white font-medium">
                            {new Date(
                              bookingDetails.appointmentDate
                            ).toLocaleDateString()}
                          </p>
                          <h3 className="text-sm font-medium text-gray-400 mt-3 mb-1">
                            Status
                          </h3>
                          <p
                            className={`font-medium ${
                              bookingDetails.isPaid
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {bookingDetails.isPaid ? "Paid" : "Unpaid"}
                          </p>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-400 mb-3">
                          Vehicle Information
                        </h3>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-400 text-sm">Make</p>
                              <p className="text-white">
                                {bookingDetails.vehicleMake || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Model</p>
                              <p className="text-white">
                                {bookingDetails.vehicleModel || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Year</p>
                              <p className="text-white">
                                {bookingDetails.vehicleYear || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">VIN</p>
                              <p className="text-white">
                                {bookingDetails.vehicleVin || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-400 mb-3">
                          Service Details
                        </h3>
                        <div className="bg-gray-800/50 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="text-left p-4 text-gray-300">
                                  Service
                                </th>
                                <th className="text-right p-4 text-gray-300">
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="p-4 text-white">
                                  Service ID: {bookingDetails.serviceId}
                                </td>
                                <td className="p-4 text-white text-right">
                                  ${bookingDetails.totalAmount}
                                </td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr className="border-t border-gray-700 bg-gray-800/80">
                                <td className="p-4 text-white font-medium">
                                  Total
                                </td>
                                <td className="p-4 text-white font-bold text-right">
                                  ${bookingDetails.totalAmount}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>

                      {bookingDetails.message && (
                        <div className="mb-8">
                          <h3 className="text-sm font-medium text-gray-400 mb-2">
                            Notes
                          </h3>
                          <p className="text-gray-300">
                            {bookingDetails.message}
                          </p>
                        </div>
                      )}

                      {!bookingDetails.isPaid && (
                        <div className="mt-6">
                          <ShimmerButton
                            onClick={() => {
                              setActiveTab("pay");
                            }}
                            className="w-full py-2.5"
                          >
                            Pay Now
                          </ShimmerButton>
                        </div>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => setBookingDetails(null)}
                    className="mt-4 text-gray-400 hover:text-white text-sm w-full text-center"
                  >
                    ← Back to lookup
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 text-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-white">
                Payment Successful!
              </h2>
              <p className="text-gray-400 mb-6">
                Thank you for your payment. A receipt has been sent to your
                email.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setBookingId("");
                  setEmail("");
                }}
                className="text-[#9E7AFF] hover:text-[#FE8BBB] transition-colors"
              >
                Make another payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
