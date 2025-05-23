import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
      <div className="max-w-2xl bg-white shadow-md rounded-lg p-8 text-center">
        <Image
          src="/assets/logo.png" // Replace with your actual photo
          alt="Your Photo"
          width={150}
          height={150}
          className="rounded-full mx-auto mb-6"
        />
        <p className="text-gray-700 leading-relaxed">
          Mobile Mechanic Muscle was founded with a simple mission: to bring
          expert automotive care directly to you. We understand that your time
          is valuable, and traditional garage visits can be inconvenient. That's
          why we've built a service that prioritizes your comfort and schedule,
          delivering top-notch repairs, maintenance, and upgrades wherever you
          are. Our team of certified mechanics is dedicated to providing
          transparent, reliable, and efficient service, ensuring your vehicle is
          always in peak condition without disrupting your day. We believe in
          building lasting relationships with our clients through trust, quality
          workmanship, and unparalleled convenience.
        </p>
      </div>
    </div>
  );
}
