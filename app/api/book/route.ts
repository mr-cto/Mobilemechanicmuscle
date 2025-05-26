import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();

    // Basic validation (more comprehensive validation should be added)
    if (
      !bookingData.service ||
      !bookingData.date ||
      !bookingData.time ||
      !bookingData.customerEmail ||
      !bookingData.customerName
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Combine date and time into a single timestamp
    const appointmentDateTime = new Date(
      `${bookingData.date}T${bookingData.time}`
    );

    // Insert booking into the database
    const newBooking = await db
      .insert(bookings)
      .values({
        serviceId: bookingData.service, // Assuming service ID is passed from frontend
        appointmentDate: appointmentDateTime,
        customerEmail: bookingData.customerEmail,
        customerName: bookingData.customerName,
        customerPhone: bookingData.customerPhone || null,
        vehicleMake: bookingData.vehicleMake || null,
        vehicleModel: bookingData.vehicleModel || null,
        vehicleYear: bookingData.vehicleYear || null,
        vehicleVin: bookingData.vehicleVin || null,
        message: bookingData.message || null,
        status: "pending",
        totalAmount: bookingData.totalAmount || null,
        isPaid: false,
      })
      .returning();

    return NextResponse.json(
      { message: "Booking created successfully", booking: newBooking[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { message: "Error creating booking" },
      { status: 500 }
    );
  }
}
