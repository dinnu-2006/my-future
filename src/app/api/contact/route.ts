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

    const serviceId = process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    
    const rawPrivateKey = process.env.EMAILJS_PRIVATE_KEY;
    const privateKey = (rawPrivateKey && 
      rawPrivateKey !== 'your_private_key_here' && 
      rawPrivateKey !== 'your_emailjs_private_key' && 
      rawPrivateKey.trim() !== '') ? rawPrivateKey : undefined;

    const autoReplyTemplateId = process.env.EMAILJS_AUTOREPLY_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;

    if (!serviceId || !templateId || !publicKey) {
      console.error('Contact API Error: EmailJS environment variables are missing.', {
        hasServiceId: !!serviceId,
        hasTemplateId: !!templateId,
        hasPublicKey: !!publicKey
      });
      return NextResponse.json(
        { error: 'Email relay is currently misconfigured on the server (missing keys).' },
        { status: 500 }
      );
    }

    // Build EmailJS REST API payload
    // Note: EmailJS REST API uses accessToken for the private key (to bypass Strict Mode requirement)
    // To prevent EmailJS/SMTP relay errors when the sender email (from_email) is identical to the recipient email (to_email)
    const receiverEmail = 'mrdineshcse@gmail.com';
    const senderEmail = email.trim().toLowerCase();
    const isSelfSend = senderEmail === receiverEmail.toLowerCase();

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey || undefined,
      template_params: {
        // Core EmailJS Template Variables
        name: name,
        email: email,
        subject: subject || `Portfolio Contact from ${name}`,
        message: isSelfSend 
          ? `${message}\n\n--- [System Log: Sent from self-test address to prevent loop errors. Original email: ${email}]` 
          : message,
        
        // Metadata / Header Parameters (for compatibility with EmailJS dashboard settings)
        from_name: name,
        from_email: isSelfSend ? `self-test@dinesh.ai` : email,
        reply_to: email,
        to_email: receiverEmail,
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
      // Send auto-reply to the visitor if configured
      const isAutoReplyConfigured = autoReplyTemplateId &&
        autoReplyTemplateId !== 'your_autoreply_template_id_here' &&
        autoReplyTemplateId !== 'your_emailjs_autoreply_template_id' &&
        autoReplyTemplateId.trim() !== '';

      if (isAutoReplyConfigured) {
        try {
          const autoReplyPayload = {
            service_id: serviceId,
            template_id: autoReplyTemplateId,
            user_id: publicKey,
            accessToken: privateKey || undefined,
            template_params: {
              // Variables matching the auto-reply template variables requested
              from_name: name,
              from_email: email,
              subject: subject || 'Portfolio Inquiry',
              message: message,
              
              // Standard fallbacks for recipient fields in EmailJS template
              name: name,
              email: email,
              to_name: name,
              to_email: email, // Set target recipient variable
              
              // Helper / convenience parameters for dynamic binding
              reply_to: receiverEmail, // Reply to auto-reply goes to Dinesh
              portfolio_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dinesh.dev',
              dinesh_email: receiverEmail,
            },
          };

          const autoReplyResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(autoReplyPayload),
          });

          if (!autoReplyResponse.ok) {
            const autoReplyText = await autoReplyResponse.text();
            console.warn(`EmailJS Auto-Reply Warning: Failed to send confirmation email to ${email}. Status: ${autoReplyResponse.status} - ${autoReplyText}`);
          } else {
            console.log(`EmailJS Auto-Reply Success: Confirmation email sent to ${email}`);
          }
        } catch (autoReplyError) {
          console.error('EmailJS Auto-Reply Exception during fetch:', autoReplyError);
        }
      }

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
