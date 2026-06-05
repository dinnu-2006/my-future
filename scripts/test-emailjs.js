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
  const publicKey = env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const recipient = env.NEXT_PUBLIC_EMAIL || 'mrdineshcse@gmail.com';

  console.log(`Checking configuration keys...`);
  console.log(`- Service ID:   ${serviceId ? '✅ Detected (' + serviceId.slice(0, 4) + '...)' : '❌ MISSING'}`);
  console.log(`- Template ID:  ${templateId ? '✅ Detected (' + templateId.slice(0, 4) + '...)' : '❌ MISSING'}`);
  console.log(`- Public Key:   ${publicKey ? '✅ Detected (' + publicKey.slice(0, 4) + '...)' : '❌ MISSING'}`);
  console.log(`- Target Email: ${recipient}\n`);

  if (!serviceId || !templateId || !publicKey) {
    console.error('ERROR: Missing required EmailJS parameters in .env.local.');
    console.error('Please configure NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY first.');
    process.exit(1);
  }

  console.log('Sending verification dummy payload to EmailJS API...');

  try {
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
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
      console.log('✅ SUCCESS! EmailJS accepted the transmission request.');
      console.log(`Response: ${responseText || 'OK'}`);
      console.log(`A verification email should arrive at ${recipient} shortly.`);
    } else {
      console.error(`❌ FAILED! EmailJS returned status ${response.status}:`);
      console.error(responseText);
    }
  } catch (error) {
    console.error('❌ EXCEPTION! An error occurred during transmission:', error.message);
  }
}

testEmail();
