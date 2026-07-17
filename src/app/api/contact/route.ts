import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    let name: string, email: string, message: string;

    const ct = req.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const body = await req.json();
      name = body.name;
      email = body.email;
      message = body.message;
    } else {
      const text = await req.text();
      const params = new URLSearchParams(text);
      name = params.get('name') || '';
      email = params.get('email') || '';
      message = params.get('message') || '';
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Toate câmpurile sînt obligatorii' }, { status: 400 });
    }

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: 'hello@darianchirca.com',
      replyTo: email,
      subject: `[D4r1an Site] ${name} — ${email}`,
      html: `
        <div style="background:#0a0a0f;color:#e0e0e0;font-family:monospace;padding:24px;border-radius:8px;border:1px solid #00ff41;max-width:600px">
          <p style="color:#00ff41;margin:0 0 16px 0">d4r1an@site:~$ <span style="color:#6b7280">cat /var/mail/new</span></p>
          <hr style="border-color:#00ff4126"/>
          <p><strong style="color:#00ff41">Nume:</strong> ${name}</p>
          <p><strong style="color:#00ff41">Email:</strong> ${email}</p>
          <hr style="border-color:#00ff4126"/>
          <p><strong style="color:#00ff41">Mesaj:</strong></p>
          <p style="background:#000;padding:12px;border-radius:4px;border:1px solid #00ff4126">${message}</p>
          <hr style="border-color:#00ff4126"/>
          <p style="color:#6b7280;font-size:12px;margin:16px 0 0 0">darianchirca.com — d4r1an@site:~$ exit 0</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: '✅ Mesaj trimis cu succes! Te voi contacta în curînd.' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Eroare la trimiterea mesajului. Încearcă mai tîrziu.' }, { status: 500 });
  }
}
