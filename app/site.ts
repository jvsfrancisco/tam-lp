const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = new URL(
  configuredUrl
    ? configuredUrl.startsWith('http') ? configuredUrl : `https://${configuredUrl}`
    : 'https://tudoaquimarketing-joo-victor-da-silva-franiscos-projects.vercel.app',
).origin;

export const siteName = 'Tudo Aqui Marketing';
export const siteDescription = 'Estratégia, identidade visual, produção de conteúdo e gestão de redes sociais para negócios que querem construir uma presença digital de verdade.';

