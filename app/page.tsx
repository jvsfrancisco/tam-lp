import Landing from './landing';
import { faqItems } from './content';
import { siteDescription, siteName, siteUrl } from './site';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/logos/tudo-aqui-mark.png`,
      image: `${siteUrl}/og.png`,
      description: siteDescription,
      telephone: '+55 21 99988-8061',
      sameAs: ['https://www.instagram.com/tudoaqui_marketing/'],
      areaServed: { '@type': 'City', name: 'Rio de Janeiro' },
      knowsAbout: ['Estratégia digital', 'Identidade visual', 'Produção audiovisual', 'Fotografia', 'Gestão de redes sociais', 'Tráfego pago'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <Landing/>
  </>;
}
