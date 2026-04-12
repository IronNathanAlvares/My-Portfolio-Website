import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(req: NextRequest) {
  try {
    const { email, phone, message } = await req.json();

    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!sendgridApiKey || !toEmail || !fromEmail) {
      console.warn('Contact API is not configured. Missing SENDGRID_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL.');
      return NextResponse.json({ ok: false, error: 'Email service is not configured.' }, { status: 503 });
    }

    sgMail.setApiKey(sendgridApiKey);
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: 'Portfolio Contact Form',
      text: `From: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    } as any;
    await sgMail.send(msg);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
