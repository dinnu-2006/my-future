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

    // Build EmailJS REST API payload for the primary notification email
    // Note: EmailJS REST API uses accessToken for the private key (to bypass Strict Mode requirement)
    // To prevent EmailJS/SMTP relay errors when the sender email (from_email) is identical to the recipient email (to_email)
    const receiverEmail = 'mrdineshcse@gmail.com';
    const senderEmail = email.trim().toLowerCase();
    const isSelfSend = senderEmail === receiverEmail.toLowerCase();

    // 1. PRIMARY EMAIL PAYLOAD (Notification sent to portfolio owner)
    // Destination: mrdineshcse@gmail.com (portfolio owner)
    // Template Variables Expected: {{name}}, {{email}}, {{subject}}, {{message}}
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey || undefined,
      template_params: {
        // Core variables matching the primary EmailJS template:
        name: name,         // Maps to {{name}} in the email body
        email: email,       // Maps to {{email}} in the email body
        subject: subject || `Portfolio Contact from ${name}`, // Maps to {{subject}}
        message: isSelfSend 
          ? `${message}\n\n--- [System Log: Sent from self-test address to prevent loop errors. Original email: ${email}]` 
          : message,       // Maps to {{message}}
        
        // Metadata / Header Parameters (for compatibility with EmailJS dashboard settings):
        from_name: name,    // Maps to {{from_name}} (used in "From Name" field in dashboard)
        from_email: isSelfSend ? `self-test@dinesh.ai` : email, // Maps to {{from_email}} (used in "From Email" field in dashboard)
        reply_to: email,    // Maps to {{reply_to}} (used in "Reply-To" field in dashboard)
        to_email: receiverEmail, // Maps to {{to_email}} (used in "To Email" field in dashboard, set to Dinesh's email)
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
      // 2. AUTO-REPLY EMAIL PAYLOAD (Confirmation sent to the visitor)
      // Destination: visitor's email address (email)
      // Template Variables Expected: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
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
              // Core variables matching the requested auto-reply EmailJS template:
              from_name: name,      // Maps to {{from_name}} in the email body ("Hi {{from_name}},")
              from_email: email,     // Maps to {{from_email}} in the email body (visitor's email details)
              subject: subject || 'Portfolio Inquiry', // Maps to {{subject}}
              message: message,     // Maps to {{message}}
              
              // Standard fallbacks for the "To Email" field in the EmailJS dashboard template settings.
              // By sending all variants (email, from_email, to_email), the auto-reply will successfully
              // route to the visitor regardless of which variable name is used in the dashboard's "To Email" field.
              name: name,
              email: email,
              to_name: name,
              to_email: email,      // Crucial: Set recipient variable to the visitor's email
              
              // Dynamic bindings for Dinesh (sender info)
              reply_to: receiverEmail, // Crucial: Any replies to the auto-reply will go to Dinesh
              portfolio_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dinesh.dev', // Maps to {{portfolio_url}}
              dinesh_email: receiverEmail, // Maps to {{dinesh_email}}
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
