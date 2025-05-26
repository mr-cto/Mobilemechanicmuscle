import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json(
        { message: "Booking ID is required" },
        { status: 400 }
      );
    }

    // In a real application, you would integrate with a payment processor here
    // For this example, we'll just mark the booking as paid

    // Find the booking by ID
    const booking = await db.query.bookings.findFirst({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.isPaid) {
      return NextResponse.json(
        { message: "This invoice has already been paid" },
        { status: 400 }
      );
    }

    // Update the booking to mark it as paid
    const updatedBooking = await db
      .update(bookings)
      .set({ isPaid: true })
      .where({ id: bookingId })
      .returning();

    // In a real application, you would send a receipt email here

    return NextResponse.json({
      message: "Payment processed successfully",
      booking: updatedBooking[0],
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { message: "Error processing payment" },
      { status: 500 }
    );
  }
}
