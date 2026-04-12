import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(req: NextRequest) {
  try {
    const { email, phone, message } = await req.json();

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL || '';
    const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || '';

    if (SENDGRID_API_KEY && TO_EMAIL && FROM_EMAIL) {
      sgMail.setApiKey(SENDGRID_API_KEY);
      const msg = {
        to: TO_EMAIL,
        from: FROM_EMAIL,
        subject: 'Portfolio Contact Form',
        text: `From: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      } as any;
      await sgMail.send(msg);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
