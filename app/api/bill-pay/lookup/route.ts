import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const { bookingId, email } = await request.json();

    if (!bookingId || !email) {
      return NextResponse.json(
        { message: "Booking ID and email are required" },
        { status: 400 }
      );
    }

    // Find the booking by ID and customer email
    const booking = await db.query.bookings.findFirst({
      where: {
        id: bookingId,
        customerEmail: email,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          message: "Booking not found. Please check your booking ID and email.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Error looking up booking:", error);
    return NextResponse.json(
      { message: "Error looking up booking" },
      { status: 500 }
    );
  }
}
