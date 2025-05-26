"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/magicui/container";

interface Booking {
  id: number;
  serviceId: number;
  appointmentDate: string;
  status: string;
  message?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleVin?: string;
  totalAmount?: string;
  isPaid: boolean;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Simple admin password authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a secure authentication system
    // For demo purposes, using a simple password check
    if (password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      fetchBookings();
    } else {
      setLoginError("Invalid password");
    }
  };

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/bookings");
      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await res.json();
      setBookings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: bookingId, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update booking status");
      }

      // Update the booking status in the local state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (err: any) {
      console.error("Error updating booking status:", err);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
  };

  if (loading && isAuthenticated) {
    return (
      <Container className="py-12">
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9E7AFF]"></div>
        </div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container className="py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB]">
            Admin Login
          </h1>
          <div className="bg-gray-900/50 p-8 rounded-xl border border-white/10">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Admin Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#9E7AFF] focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Login
              </button>
              {loginError && (
                <p className="text-red-400 text-sm mt-2">{loginError}</p>
              )}
            </form>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB]">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-6">
          Error: {error}
        </div>
      )}

      <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4 text-white">All Bookings</h2>

        {bookings.length === 0 && !loading && !error && (
          <p className="text-center text-gray-400 py-8">No bookings found.</p>
        )}

        {bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-300">ID</th>
                  <th className="py-3 px-4 text-left text-gray-300">
                    Customer
                  </th>
                  <th className="py-3 px-4 text-left text-gray-300">
                    Date & Time
                  </th>
                  <th className="py-3 px-4 text-left text-gray-300">Service</th>
                  <th className="py-3 px-4 text-left text-gray-300">Amount</th>
                  <th className="py-3 px-4 text-left text-gray-300">Status</th>
                  <th className="py-3 px-4 text-left text-gray-300">Payment</th>
                  <th className="py-3 px-4 text-left text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-800">
                    <td className="py-3 px-4 text-white">{booking.id}</td>
                    <td className="py-3 px-4 text-white">
                      <div>{booking.customerName}</div>
                      <div className="text-sm text-gray-400">
                        {booking.customerEmail}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">
                      {new Date(booking.appointmentDate).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-white">
                      Service #{booking.serviceId}
                    </td>
                    <td className="py-3 px-4 text-white">
                      ${booking.totalAmount || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === "completed"
                            ? "bg-green-500/20 text-green-300"
                            : booking.status === "confirmed"
                            ? "bg-blue-500/20 text-blue-300"
                            : booking.status === "cancelled"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.isPaid
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {booking.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(booking.id, e.target.value)
                        }
                        className="bg-gray-800 border border-gray-700 rounded p-1 text-white text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
}
