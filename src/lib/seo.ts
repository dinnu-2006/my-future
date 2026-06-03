export const seoConfig = {
  title: 'Synapse.core | AI Developer & Founder Portfolio',
  description: 'Portfolio of a CSE Student specializing in Multi-Agent AI Development, Full Stack SaaS Engineering, and Programmatic SEO Automations.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://synapse-core.dev',
  github: process.env.NEXT_PUBLIC_GITHUB || 'https://github.com/dinnu-2006',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN || 'https://www.linkedin.com/in/dinesh-p-666867413?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  email: process.env.NEXT_PUBLIC_EMAIL || 'mrdineshcse@gmail.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://synapse-core.dev',
    title: 'Synapse.core | AI Developer & Founder Portfolio',
    description: 'Portfolio of a CSE Student specializing in Multi-Agent AI Development, Full Stack SaaS Engineering, and Programmatic SEO Automations.',
    siteName: 'Synapse.core',
    images: [
      {
        url: 'https://synapse-core.dev/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Synapse Core AI Developer Portfolio Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synapse.core | AI Developer & Founder Portfolio',
    description: 'Portfolio of a CSE Student specializing in Multi-Agent AI Development, Full Stack SaaS Engineering, and Programmatic SEO Automations.',
    creator: '@synapse_core',
    images: ['https://synapse-core.dev/images/og-image.png'],
  },
};
