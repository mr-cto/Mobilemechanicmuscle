import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, vinOrPlate, email, serviceRequest } = req.body;

  if (!fullName || !vinOrPlate || !email || !serviceRequest) {
    return res.status(400).json({ message: 'Missing fields' });
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

    res.status(200).json({ message: 'Sent' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send', error: String(err) });
  }
}
