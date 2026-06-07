/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

async function testEmail() {
  console.log('--- EmailJS Diagnostics & Verification Script ---');
  
  // Resolve .env.local path
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('ERROR: .env.local file not found. Please create it.');
    process.exit(1);
  }
  
  // Read and parse env file
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  envContent.split(/\r?\n/).forEach(line => {
    // Remove comments
    const cleanLine = line.split('#')[0].trim();
    const match = cleanLine.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let value = match[2] ? match[2].trim() : '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      env[match[1]] = value;
    }
  });

  const serviceId = env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const autoReplyTemplateId = env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;
  const publicKey = env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const rawPrivateKey = env.EMAILJS_PRIVATE_KEY || process.env.EMAILJS_PRIVATE_KEY;
  const privateKey = (rawPrivateKey && 
    rawPrivateKey !== 'your_private_key_here' && 
    rawPrivateKey !== 'your_emailjs_private_key' && 
    rawPrivateKey.trim() !== '') ? rawPrivateKey : undefined;
  const recipient = env.NEXT_PUBLIC_EMAIL || 'mrdineshcse@gmail.com';

  console.log(`Checking configuration keys...`);
  console.log(`- Service ID:             ${serviceId ? '✅ Detected (' + serviceId.slice(0, 4) + '...)' : '❌ MISSING'}`);
  console.log(`- Primary Template ID:    ${templateId ? '✅ Detected (' + templateId.slice(0, 4) + '...)' : '❌ MISSING'}`);
  console.log(`- Auto-Reply Template ID: ${autoReplyTemplateId && autoReplyTemplateId !== 'your_autoreply_template_id_here' ? '✅ Detected (' + autoReplyTemplateId.slice(0, 4) + '...)' : 'ℹ️ NOT SET (Auto-reply skipped in test)'}`);
  console.log(`- Public Key:             ${publicKey ? '✅ Detected (' + publicKey.slice(0, 4) + '...)' : '❌ MISSING'}`);
  console.log(`- Private Key (Token):    ${privateKey ? '✅ Detected (' + privateKey.slice(0, 4) + '...)' : 'ℹ️ NOT CONFIGURED (Optional if Strict Mode is off)'}`);
  console.log(`- Target Email:           ${recipient}\n`);

  if (!serviceId || !templateId || !publicKey) {
    console.error('ERROR: Missing required EmailJS parameters in .env.local.');
    console.error('Please configure NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY first.');
    process.exit(1);
  }

  console.log('Sending verification dummy payload to EmailJS API (Primary)...');

  try {
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        name: 'Synapse Core Verifier',
        email: 'verifier@synapse-core.dev',
        subject: 'EmailJS Configuration Verification',
        message: 'Congratulations! Your portfolio contact form integration is working successfully.',
        from_name: 'Synapse Core Verifier',
        from_email: 'verifier@synapse-core.dev',
        reply_to: 'verifier@synapse-core.dev',
        to_email: recipient,
      }
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
      console.log('✅ SUCCESS! EmailJS accepted the primary transmission request.');
      console.log(`Response: ${responseText || 'OK'}`);
      console.log(`A verification email should arrive at ${recipient} shortly.\n`);
    } else {
      console.error(`❌ FAILED! EmailJS returned status ${response.status}:`);
      console.error(responseText);
      return;
    }

    // Auto-Reply Verification
    const isAutoReplyConfigured = autoReplyTemplateId && 
      autoReplyTemplateId !== 'your_autoreply_template_id_here' && 
      autoReplyTemplateId.trim() !== '';

    if (isAutoReplyConfigured) {
      console.log('Sending verification dummy payload to EmailJS API (Auto-Reply)...');
      const autoReplyPayload = {
        service_id: serviceId,
        template_id: autoReplyTemplateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          from_name: 'Dinesh (Verifier)',
          from_email: recipient,
          subject: 'EmailJS Auto-Reply Verification',
          message: 'Congratulations! Your portfolio auto-reply confirmation email integration is working successfully.',
          
          // Fallbacks for recipient fields
          name: 'Dinesh (Verifier)',
          email: recipient,
          to_name: 'Dinesh (Verifier)',
          to_email: recipient,

          // Helper / convenience parameters for dynamic binding
          reply_to: recipient,
          portfolio_url: env.NEXT_PUBLIC_SITE_URL || 'https://dinesh.dev',
          dinesh_email: recipient,
        }
      };

      const arResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(autoReplyPayload),
      });

      const arResponseText = await arResponse.text();

      if (arResponse.ok) {
        console.log('✅ SUCCESS! EmailJS accepted the Auto-Reply transmission request.');
        console.log(`Response: ${arResponseText || 'OK'}`);
        console.log(`A confirmation auto-reply email should arrive at ${recipient} shortly.`);
      } else {
        console.error(`❌ FAILED! EmailJS Auto-Reply returned status ${arResponse.status}:`);
        console.error(arResponseText);
      }
    }
  } catch (error) {
    console.error('❌ EXCEPTION! An error occurred during transmission:', error.message);
  }
}

testEmail();
