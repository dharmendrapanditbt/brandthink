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

// Records the request as a lead in BT Pulse (the lead CRM). Returns false, and logs why, if that did not work.
async function sendToPulse(fields: Record<string, string | undefined>): Promise<boolean> {
  const url = process.env.PULSE_INTAKE_URL;
  const token = process.env.PULSE_INTAKE_TOKEN;
  if (!url || !token) {
    console.warn('BT Pulse intake is not configured (PULSE_INTAKE_URL / PULSE_INTAKE_TOKEN); strategy call not recorded there');
    return false;
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ form: 'strategy-call', ...fields }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error('BT Pulse intake error:', res.status, await res.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('BT Pulse intake failed:', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, preferredTime } = await req.json() as Record<string, string>;

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // The request is saved if either BT Pulse or the email notification gets it.
    const [savedInPulse, emailed] = await Promise.all([
      sendToPulse({ name, email, company, preferredTime, page: req.headers.get('referer') ?? undefined }),
      makeTransport().sendMail({
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
      }).then(
        () => true,
        (err) => {
          console.error('Strategy call email error:', err);
          return false;
        },
      ),
    ]);

    if (!savedInPulse && !emailed) {
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Strategy call API error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
