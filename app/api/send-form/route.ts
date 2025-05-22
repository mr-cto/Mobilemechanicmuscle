import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { fullName, vinOrPlate, email, serviceRequest } = await req.json();

  if (!fullName || !vinOrPlate || !email || !serviceRequest) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Service Request',
      text: `Name: ${fullName}\nPlate: ${vinOrPlate.plateNumber} (${vinOrPlate.state})\nEmail: ${email}\nRequest: ${serviceRequest}`
    });

    return NextResponse.json({ message: 'Sent' });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to send', error: String(err) }, { status: 500 });
  }
}
