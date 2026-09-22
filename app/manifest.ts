import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tudo Aqui Marketing',
    short_name: 'Tudo Aqui',
    description: 'Estratégia, identidade visual, conteúdo e gestão de redes sociais.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f4ec',
    theme_color: '#f8c010',
    lang: 'pt-BR',
    icons: [{ src: '/logos/tudo-aqui-mark.png', sizes: '256x256', type: 'image/png' }],
  };
}
