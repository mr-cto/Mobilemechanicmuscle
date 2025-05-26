import { NextResponse } from "next/server";
import { db } from "@/db";

// Simple admin check (should be more robust in a real app)
// In a real application, this would use a secure authentication method
function isAdminRequest(request: Request) {
  // For demo purposes, we're not implementing real API key validation
  // In a production app, you would validate API keys properly
  return true;
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const allBookings = await db.query.bookings.findMany();
    return NextResponse.json(allBookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { message: "Missing booking ID or status" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    // Use the Firebase-compatible update method
    const updatedBooking = await db
      .update("bookings")
      .set({ status: status })
      .where({ id: id })
      .returning();

    if (updatedBooking.length === 0) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Booking status updated successfully",
        booking: updatedBooking[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json(
      { message: "Error updating booking status" },
      { status: 500 }
    );
  }
}
