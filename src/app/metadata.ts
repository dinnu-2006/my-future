import { Metadata } from 'next';
import { seoConfig } from '@/lib/seo';

export const globalMetadata: Metadata = {
  title: {
    default: seoConfig.title,
    template: `%s | Synapse.core`,
  },
  description: seoConfig.description,
  metadataBase: new URL(seoConfig.url),
  openGraph: seoConfig.openGraph,
  twitter: seoConfig.twitter,
};
