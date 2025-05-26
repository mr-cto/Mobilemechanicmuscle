import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-auto">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/services" className="hover:underline">
            Services
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Mobile Mechanic Muscle. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
