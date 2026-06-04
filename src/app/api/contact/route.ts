import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Required fields (name, email, message) are missing.' },
        { status: 400 }
      );
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY; // Loaded securely on server

    if (!serviceId || !templateId || !publicKey) {
      console.error('Contact API Error: EmailJS environment variables are missing.');
      return NextResponse.json(
        { error: 'Email relay is currently misconfigured on the server.' },
        { status: 500 }
      );
    }

    // Build EmailJS REST API payload
    // Note: EmailJS REST API uses accessToken for the private key (to bypass Strict Mode requirement)
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey || undefined,
      template_params: {
        from_name: name,
        from_email: email,
        reply_to: email,
        subject: subject || `Portfolio Contact from ${name}`,
        message: message,
        to_email: 'mrdineshcse@gmail.com',
      },
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Message sent successfully.' });
    } else {
      console.error(`EmailJS API Error: Status ${response.status} - ${responseText}`);
      return NextResponse.json(
        { error: responseText || `EmailJS returned status ${response.status}` },
        { status: response.status }
      );
    }
  } catch (error: any) {
    console.error('Contact API handler error:', error);
    return NextResponse.json(
      { error: error?.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
