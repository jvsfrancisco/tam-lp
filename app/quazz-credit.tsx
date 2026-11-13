'use client';

import { useRef, type MouseEvent } from 'react';
import { QuazzLogo } from './quazz-logo';

const quazzUrl = 'https://quazz.com.br';

// Easter egg do crédito, no tema da página (timeline de gravação): uma lâmpada (a do
// logo da TAM) sai do cristal da Quazz, o cristal cresce e acende em amarelo; então a
// claquete entra pelo lado do nome e dá o take, o grifo passa e abre o site da Quazz.
// Ctrl/Cmd/Shift-clique, movimento pausado ou reduzido: abre direto, sem cena.
export function QuazzCredit() {
  const link = useRef<HTMLAnchorElement>(null);
  function action(event: MouseEvent<HTMLAnchorElement>) {
    const node = link.current;
    const still = document.documentElement.dataset.motion === 'off' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!node || still || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    node.classList.remove('is-rolling');
    requestAnimationFrame(() => node.classList.add('is-rolling'));
    setTimeout(() => {
      node.classList.remove('is-rolling');
      // Com 'noopener' o window.open sempre devolve null, então cortamos o opener à mão.
      // Só cai na aba atual se o navegador bloquear a aba nova.
      const tab = window.open(quazzUrl, '_blank');
      if (tab) tab.opener = null;
      else window.location.href = quazzUrl;
    }, 1800);
  }
  return <div className="credit wrap">
    <span>Desenvolvido pela</span>
    <a ref={link} className="quazz-easter" href={quazzUrl} target="_blank" rel="noopener" onClick={action} aria-label="Quazz, abre o site da Quazz" title="Luz, câmera, ação">
      <QuazzLogo/>
      <span className="quazz-clap" aria-hidden="true"><span className="quazz-clap-arm"/></span>
      <span className="quazz-mark" aria-hidden="true"/>
      <svg className="quazz-bulb" viewBox="0 0 28 34" width="22" height="27" aria-hidden="true" focusable="false">
        <path className="quazz-bulb-rays" d="M14 1v3.2M4.3 5.3l2.2 2.2M23.7 5.3l-2.2 2.2M1.5 15h3.2M26.5 15h-3.2"/>
        <path className="quazz-bulb-glass" d="M14 6a8 8 0 0 0-4.6 14.5c.9.7 1.4 1.5 1.4 2.5v1h6.4v-1c0-1 .5-1.8 1.4-2.5A8 8 0 0 0 14 6Z"/>
        <path className="quazz-bulb-filament" d="M11.5 19.5 13 13.5l1 2.5 1-2.5 1.5 6"/>
        <path className="quazz-bulb-base" d="M11 27h6M12 30h4"/>
      </svg>
    </a>
  </div>;
}
