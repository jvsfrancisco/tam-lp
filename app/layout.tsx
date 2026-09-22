import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, DM_Sans } from 'next/font/google';
import './globals.css';
import { siteDescription, siteName, siteUrl } from './site';
const bodyFont = DM_Sans({ variable: '--font-body', subsets: ['latin'], display: 'swap' });
const displayFont = Barlow_Condensed({ variable: '--font-display', subsets: ['latin'], weight: ['500','600','700','800'], display: 'swap' });
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Tudo Aqui Marketing | Estratégia, conteúdo e redes sociais', template: `%s | ${siteName}` },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: 'marketing digital',
  keywords: ['agência de marketing digital', 'gestão de redes sociais', 'produção de conteúdo', 'identidade visual', 'fotografia para empresas', 'vídeos para redes sociais', 'estratégia digital'],
  alternates: { canonical: '/', languages: { 'pt-BR': '/' } },
  icons: { icon: '/logos/tudo-aqui-mark.png', apple: '/logos/tudo-aqui-mark.png' },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Tudo Aqui Marketing | Seu negócio tem muito para mostrar',
    description: siteDescription,
    url: '/',
    siteName,
    images: [{ url: '/og.png', width: 1733, height: 908, alt: 'Tudo Aqui Marketing — Seu negócio tem muito para mostrar.' }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Tudo Aqui Marketing | Seu negócio tem muito para mostrar', description: siteDescription, images: ['/og.png'] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f7f4ec' }, { media: '(prefers-color-scheme: dark)', color: '#171815' }] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html: `(()=>{let theme=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";let motion=matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"on";try{const t=localStorage.getItem("tam-theme");if(t==="dark"||t==="light")theme=t;const m=localStorage.getItem("tam-motion");if(m==="off")motion="off";}catch{}document.documentElement.dataset.theme=theme;document.documentElement.dataset.motion=motion;})()`}}/></head><body className={bodyFont.variable+' '+displayFont.variable}>{children}</body></html>; }
