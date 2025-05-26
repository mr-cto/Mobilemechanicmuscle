"use client";

import { useState, useEffect } from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { FaStar, FaGoogle } from "react-icons/fa";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    async function fetchGoogleReviews() {
      try {
        setLoading(true);
        const response = await fetch("/api/google-reviews");
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError("Failed to load reviews");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGoogleReviews();
  }, []);

  // Auto-rotate reviews every 5 seconds
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Format date from timestamp
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={`${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  if (loading) {
    return (
      <MagicCard className="max-w-2xl mx-auto mb-12" gradientOpacity={0.2}>
        <div className="bg-blue-100/90 backdrop-blur-sm p-8 rounded-lg text-center">
          <p className="text-gray-800">Loading reviews...</p>
        </div>
      </MagicCard>
    );
  }

  if (error) {
    return (
      <MagicCard className="max-w-2xl mx-auto mb-12" gradientOpacity={0.2}>
        <div className="bg-blue-100/90 backdrop-blur-sm p-8 rounded-lg text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </MagicCard>
    );
  }

  if (reviews.length === 0) {
    return (
      <MagicCard className="max-w-2xl mx-auto mb-12" gradientOpacity={0.2}>
        <div className="bg-blue-100/90 backdrop-blur-sm p-8 rounded-lg text-center">
          <p className="text-gray-800">No reviews available at this time.</p>
        </div>
      </MagicCard>
    );
  }

  const currentReview = reviews[currentReviewIndex];

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-4">
        <FaGoogle className="text-blue-600 text-2xl mr-2" />
        <h3 className="text-xl font-bold text-gray-900">Google Reviews</h3>
      </div>

      <MagicCard className="max-w-2xl mx-auto mb-4" gradientOpacity={0.2}>
        <div className="bg-blue-100/90 backdrop-blur-sm p-8 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-900 font-semibold">
              {currentReview.author_name}
            </p>
            <div className="flex">{renderStars(currentReview.rating)}</div>
          </div>
          <p className="text-gray-800 italic text-lg mb-4">
            "{currentReview.text}"
          </p>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">
              {formatDate(currentReview.time)}
            </p>
            <div className="flex space-x-1">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentReviewIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`View review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </MagicCard>

      <div className="text-center">
        <a
          href="https://www.google.com/maps/place/Mobile+Mechanic+Muscle/@36.1622767,-86.7742984,15z/data=!4m6!3m5!1s0x8864669fedeafc1d:0xd8db0f8a25c0b8e!8m2!3d36.1622767!4d-86.7742984!16s%2Fg%2F11t_xw_0_8?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-800 hover:text-blue-600 text-sm font-medium"
        >
          See all reviews on Google
        </a>
      </div>
    </div>
  );
}
