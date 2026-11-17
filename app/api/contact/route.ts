import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendToPulse } from '@/lib/pulse';

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
    const { name, email, company, message } = await req.json() as Record<string, string>;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Also record the message as a lead in BT Pulse. Best-effort: the email below goes out either way.
    await sendToPulse('contact', { name, email, company, message, page: req.headers.get('referer') ?? undefined });

    makeTransport().sendMail({
      from: `"BrandThink Website" <${process.env.SMTP_USER}>`,
      to: [process.env.SMTP_TO ?? 'adityaraj@thebrandthink.com', 'ankit.rohilla@thebrandthink.com'],
      replyTo: email,
      subject: `Contact: ${name}${company ? ` — ${company}` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company ?? 'N/A'}\n\n${message}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Company:</b> ${company ?? 'N/A'}</p><hr><p>${message.replace(/\n/g, '<br>')}</p>`,
    }).catch(err => console.error('Contact email error:', err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
