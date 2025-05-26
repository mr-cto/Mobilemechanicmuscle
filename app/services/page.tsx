"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { InteractiveGrid } from "@/components/magicui/interactive-grid";
import { MagicCard } from "@/components/magicui/magic-card";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Container } from "@/components/magicui/container";

export default function ServicesPage() {
  const serviceGroups = [
    {
      id: "mobile-repairs",
      name: "Mobile Repairs",
      description:
        "Our mobile repair service provides convenient and reliable solutions for all your automotive needs. Whether you have a flat tire, a dead battery, or an engine problem, our team of skilled mechanics will come to your location and get you back on the road in no time. We offer quick response times, competitive prices, and quality workmanship. Trust us to take care of your vehicle wherever you are.",
      image: "/assets/logo.png", // Placeholder - replace with "2023-06-06 1-1" image when available
    },
    {
      id: "cosmetic-enhancements",
      name: "Cosmetic Enhancements & Detailing",
      description:
        "At Mobile Mechanic Muscle, we specialize in cosmetic enhancements to make your vehicle stand out from the crowd. Whether you want a new paint job, custom decals, detailing or body kit installation, our expert technicians have the skills and experience to transform your car into a head-turning masterpiece. We use high-quality materials and meticulous attention to detail to ensure a flawless finish. Enhance the appearance of your vehicle with our cosmetic services.",
      image: "/assets/logo.png", // Placeholder - replace with "Messenger_creation_6af3cfd9-82c3-4eac-a91f-2fccf1195099~3" image when available
    },
    {
      id: "performance-upgrades",
      name: "Performance Upgrades",
      description:
        "If you're looking to boost your vehicle's performance, look no further than Mobile Mechanic Muscle. Our team of performance specialists can help you unleash the full potential of your car. From engine tuning and turbocharger installation to suspension upgrades and exhaust system modifications, we offer a wide range of performance services tailored to your specific needs. Our goal is to enhance your driving experience and give you the power and agility you crave. Get ready to take your vehicle to the next level with our performance upgrades.",
      image: "/assets/logo.png", // Placeholder - replace with appropriate image when available
    },
  ];

  return (
    <div className="min-h-screen relative">
      <ScrollProgress color="#1e40af" />
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-20">
        <InteractiveGrid
          variant="lines"
          containerClassName="absolute inset-0"
          className="opacity-10"
        />
        <Container>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600 mb-12 text-center">
            Our Services
          </h1>
          <div className="flex flex-col gap-16">
            {serviceGroups.map((group) => (
              <div
                key={group.id}
                className="flex flex-col lg:flex-row gap-8 items-center"
              >
                <div className="lg:w-1/2">
                  <Image
                    src={group.image}
                    alt={group.name}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    {group.name}
                  </h2>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    {group.description}
                  </p>
                  <Link
                    href={`/book?service=${group.id}`}
                    className="inline-block"
                  >
                    <ShimmerButton className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg text-lg">
                      Request Estimate
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
