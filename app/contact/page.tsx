import React from "react";
import Image from "next/image";
import { FaPhone, FaSms } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <form
          action="https://formspree.io/f/your-form-id"
          method="POST"
          className="mb-8"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-800 hover:bg-yellow-400 hover:text-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Send Message
          </button>
        </form>

        <div className="flex justify-around mb-8">
          <a
            href="tel:+1-555-555-5555"
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-300"
          >
            <FaPhone className="mr-2" /> Call Us
          </a>
          <a
            href="sms:+1-555-555-5555"
            className="flex items-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-300"
          >
            <FaSms className="mr-2" /> Text Us
          </a>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Our Location
          </h3>
          <Image
            src="/assets/map-screenshot.png" // Placeholder for a static map screenshot
            alt="Our Location on Map"
            width={400}
            height={250}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
