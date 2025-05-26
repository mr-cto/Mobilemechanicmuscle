import { NextResponse } from "next/server";

// In a real implementation, you would use the Google Places API
// You would need to set up environment variables for the API key
// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
// const PLACE_ID = process.env.GOOGLE_PLACE_ID; // Place ID for Mobile Mechanic Muscle in Nashville

export async function GET() {
  try {
    // In production, you would fetch from the Google Places API like this:
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`
    // );
    // const data = await response.json();
    // const reviews = data.result.reviews;

    // For now, we'll return mock data
    const mockReviews = [
      {
        author_name: "John D.",
        rating: 5,
        text: "Mobile Mechanic Muscle is a lifesaver! My car wouldn't start before work, and they came right to my driveway to replace the battery. Fast, professional service at a fair price.",
        time: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
      },
      {
        author_name: "Sarah M.",
        rating: 5,
        text: "Amazing mobile mechanic service! They performed a full brake job in my office parking lot while I was at work. Saved me so much time and the inconvenience of taking my car to a shop.",
        time: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
      },
      {
        author_name: "Robert T.",
        rating: 4,
        text: "Great diagnostic service. The mechanic thoroughly checked my check engine light issue and fixed it on the spot. Very knowledgeable about different car makes and models.",
        time: Date.now() - 21 * 24 * 60 * 60 * 1000, // 21 days ago
      },
      {
        author_name: "Emily K.",
        rating: 5,
        text: "Had transmission issues and they came out same day. Fixed the problem right in my driveway and saved me hundreds compared to the dealership. These guys know their stuff!",
        time: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      },
      {
        author_name: "Michael P.",
        rating: 5,
        text: "Best mobile mechanic service in Nashville! They did a full tune-up and oil change at my house. No more waiting at repair shops. Professional, punctual, and fairly priced.",
        time: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
      },
    ];

    return NextResponse.json(mockReviews);
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
