import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function makeTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.zoho.in',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, preferredTime } = await req.json() as Record<string, string>;

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await makeTransport().sendMail({
      from: `"BrandThink Website" <${process.env.SMTP_USER}>`,
      to: [process.env.SMTP_TO ?? 'adityaraj@thebrandthink.com'],
      replyTo: email,
      subject: `Strategy Call Request: ${name}${company ? ` — ${company}` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company ?? 'N/A'}\nPreferred Time: ${preferredTime ?? 'Not specified'}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company ?? 'N/A'}</p>
        <p><b>Preferred Time:</b> ${preferredTime ?? 'Not specified'}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Strategy call API error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
