'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type PointerEvent } from 'react';
import { BrandLogo } from './brand-logo';
import { QuazzLogo } from './quazz-logo';
import { InterestPicker } from './interest-picker';
import { ArrowDownRightIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, MoonIcon, PauseIcon, PlayIcon, SparkIcon, StarIcon, SunIcon } from './ui-icons';
import { faqItems } from './content';

const whatsapp = 'https://wa.me/5521999888061';
const googleReview = 'https://www.google.com/maps/place//data=!4m3!3m2!1s0x997fd9270884ef:0x4f13ae1597048f17!12e1?source=g.page.m._&laa=merchant-review-solicitation';
const clients = [
  { name: 'Johan Veículos', image: '/logos/johan.jpg', handle: 'johan.veiculos', field: 'AUTOMOTIVO' },
  { name: 'El Hombre', image: '/logos/el-hombre.png', handle: 'barbearia_elhombre', field: 'BARBEARIA' },
  { name: 'Club Alfa', image: '/logos/club-alfa.png', handle: 'barbearia_clubalfa', field: 'BARBEARIA' },
  { name: 'Café da Vila', image: '/logos/cafe-da-vila.jpg', handle: 'cafedavila21', field: 'ALIMENTAÇÃO' },
];
const rail = [
  { seg: 'BARBEARIA', metric: '2,93x', unit: 'mais visualizações no perfil', name: 'Barbearia Club Alfa', did: 'Começou do zero com a agência. Uma gravação vira vários conteúdos do mês.', note: 'De 19.442 para 56.983, aumento de 193%. A agência publicou 4x e alterna alcance e visualizações. A conferir na origem.', logo: '/logos/club-alfa.png', handle: 'barbearia_clubalfa' },
  { seg: 'MODA MASCULINA', metric: '+1 milhão', unit: 'de visualizações em 60 dias', name: 'Bem Trajados', did: 'Reuniões de alinhamento e produção de conteúdo para a loja e para o perfil.', note: 'Crescimento orgânico, sem anúncios pagos, segundo o destaque de Resultados da agência.', logo: null, handle: 'bemtrajado2564' },
  { seg: 'ALIMENTAÇÃO', metric: 'Do zero', unit: 'à presença completa', name: 'Café da Vila', did: 'Criação do Instagram, logo, identidade visual e mini site para a abertura.', note: 'Escopo declarado pela agência no post de 24/02/2026. Vila do João, Maré.', logo: '/logos/cafe-da-vila.jpg', handle: 'cafedavila21' },
  { seg: 'BARBEARIA', metric: '2 anos', unit: 'de parceria contínua', name: 'Barbearia El Hombre', did: 'Planejamento, gravações e conteúdo acompanhando a rotina de várias unidades.', note: 'A agência relata crescimento no período. Os números publicados não isolam o efeito do marketing.', logo: '/logos/el-hombre.png', handle: 'barbearia_elhombre' },
  { seg: 'BELEZA', metric: '37%', unit: 'do alcance veio de não seguidores', name: 'Noemy Almeida Lash', did: 'Captação de bastidores e roteiros sobre cuidado com a extensão de cílios.', note: '5 mil visualizações em uma semana, print de insights no destaque Resultados.', logo: null, handle: 'noemyralmeida_lash' },
  { seg: 'ESTÚDIO DE BELEZA', metric: 'Antes e agora', unit: 'da presença digital', name: 'Beatriz Lima Beauty', did: 'Bio estratégica, Linktree, Google atualizado, identidade, destaques e posts fixados.', note: 'Reorganização publicada pela agência em 02/03/2026. Méier.', logo: null, handle: 'beatrizllimabeauty' },
];
const heroShots = [
  { src: '/images/captacao-loja.jpg', width: 960, height: 1280, focus: '50% 34%', label: 'NA LOJA', alt: 'Integrante da Tudo Aqui gravando, com celular em estabilizador, uma funcionária na porta da loja do cliente', caption: 'Gravação em andamento na porta da loja do cliente' },
  { src: '/images/bandeira-rua.jpg', width: 720, height: 1280, focus: '50% 60%', label: 'NA RUA', alt: 'Integrante da Tudo Aqui, de camisa da agência, acompanhando uma gravação na rua com bandeirinhas e uma bandeira do Brasil', caption: 'Produção na rua, com a equipe em campo' },
  { src: '/images/estudio-gravacao.jpg', width: 960, height: 1280, focus: '50% 55%', label: 'NO ESTÚDIO', alt: 'Gravação em estúdio: cliente sentada diante de fundo colorido, iluminada por softbox e enquadrada no celular', caption: 'Captação em estúdio, com luz e direção' },
];
const reviews = [
  { text: 'Serviço de Excelente Qualidade e Agilidade!!! Profissional super comprometido com a satisfação e resultado para o cliente!!! Super recomendo!!!!', who: 'Jorge Batista', from: 'Café da Vila', when: 'print de story, mar/2026' },
  { text: 'Excelente serviço! Superou minhas expectativas. Fizemos um pacote de gravações para o fim do ano e já me resultou em várias clientes. Recomendo', who: 'Salão VisualPop', from: 'Salão de beleza', when: 'print de story, nov/2025' },
];
const services = [
  { number: '01', label: 'COMEÇAR', title: 'Dar forma à sua marca.', description: 'Sua empresa tem personalidade. A identidade, o perfil e os pontos de contato precisam mostrar isso desde o primeiro olhar.', items: ['Identidade visual', 'Estruturação de perfil', 'Presença digital'], proof: 'Do logo ao Instagram: conheça a história do Café da Vila.', link: '#casos', shape: 'identity' },
  { number: '02', label: 'APARECER', title: 'Colocar sua história em cena.', description: 'Transformamos o que acontece no seu negócio em fotos, vídeos e conteúdo com direção. Da ideia e do roteiro até a captação e a edição.', items: ['Produção audiovisual', 'Fotografia', 'Roteiros e conteúdo'], proof: 'Conteúdo começa com uma boa conversa. E ganha vida na gravação.', link: '#por-perto', shape: 'content' },
  { number: '03', label: 'CONTINUAR', title: 'Ter presença. De verdade.', description: 'Estratégia, gestão de redes e acompanhamento para sua comunicação ter continuidade. Um trabalho construído junto com a sua empresa.', items: ['Planejamento estratégico', 'Gestão de redes', 'Tráfego pago e acompanhamento'], proof: 'Uma parceria que continua: veja o caso da Johan Veículos.', link: '#casos', shape: 'growth' },
];

function subscribePreferences(callback: () => void) {
  window.addEventListener('tam-preferences', callback);
  window.addEventListener('storage', callback);
  return () => { window.removeEventListener('tam-preferences', callback); window.removeEventListener('storage', callback); };
}
const getDark = () => document.documentElement.dataset.theme === 'dark';
const getPaused = () => document.documentElement.dataset.motion === 'off';
const serverFalse = () => false;

function Controls() {
  const dark = useSyncExternalStore(subscribePreferences, getDark, serverFalse);
  const paused = useSyncExternalStore(subscribePreferences, getPaused, serverFalse);
  function change(key: 'theme' | 'motion', value: string) {
    document.documentElement.dataset[key] = value;
    try { localStorage.setItem('tam-' + key, value); } catch { /* Preferences still apply for this visit. */ }
    window.dispatchEvent(new Event('tam-preferences'));
  }
  return <div className="view-controls">
    <button className="icon-button motion-toggle" onClick={() => change('motion', paused ? 'on' : 'off')} aria-pressed={paused} aria-label={paused ? 'Retomar animações' : 'Pausar animações'} title={paused ? 'Retomar animações' : 'Pausar animações'}>{paused ? <PlayIcon/> : <PauseIcon/>}<span className="motion-toggle-label">{paused ? 'Retomar' : 'Pausar'}</span></button>
    <button className="theme-toggle" onClick={() => change('theme', dark ? 'light' : 'dark')} aria-pressed={dark} aria-label={dark ? 'Mudar para modo claro' : 'Mudar para modo escuro'} title={dark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}><span className="theme-sun" aria-hidden="true"><SunIcon/></span><span className="theme-moon" aria-hidden="true"><MoonIcon/></span><span className="theme-thumb" /></button>
  </div>;
}

function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || getPaused() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - .5) * -10;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => { target.style.setProperty('--rx', `${y}deg`); target.style.setProperty('--ry', `${x}deg`); });
  }
  function reset(event: PointerEvent<HTMLDivElement>) { cancelAnimationFrame(frame.current); event.currentTarget.style.setProperty('--rx', '0deg'); event.currentTarget.style.setProperty('--ry', '0deg'); }
  return <div className={`tilt ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}

function Arrow() { return <ArrowUpRightIcon className="arrow-icon"/>; }

function HeroCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const paused = useSyncExternalStore(subscribePreferences, getPaused, serverFalse);
  const cursor = useRef(0);
  // Duas cópias da lista: ao chegar na segunda, volta em silêncio para a primeira.
  // O slide é idêntico, então o corte não aparece e o carrossel só anda para a direita.
  const loop = [...heroShots, ...heroShots];
  // Posição vem do offsetLeft real de cada slide: calcular por clientWidth acumula o
  // erro fracionário do flex-basis e deixa uma fatia da foto seguinte aparecendo.
  function slideAt(node: HTMLDivElement, index: number) {
    return node.children[index] as HTMLElement | undefined;
  }
  function measure() {
    const node = track.current;
    if (!node) return;
    const step = node.clientWidth;
    if (!step) return;
    const wrapAt = slideAt(node, heroShots.length);
    if (wrapAt && node.scrollLeft >= wrapAt.offsetLeft - 1) {
      node.scrollTo({ left: node.scrollLeft - wrapAt.offsetLeft, behavior: 'auto' });
      return;
    }
    cursor.current = Math.round(node.scrollLeft / step);
    setActive(cursor.current % heroShots.length);
  }
  function go(index: number) {
    const node = track.current;
    if (!node) return;
    const slide = slideAt(node, index);
    if (!slide) return;
    node.scrollTo({ left: slide.offsetLeft, behavior: getPaused() ? 'auto' : 'smooth' });
  }
  // Autoplay: lê `cursor` por ref para o onScroll da rolagem suave não rearmar o timer a cada quadro.
  useEffect(() => {
    if (paused || held) return;
    const timer = setInterval(() => {
      const node = track.current;
      if (document.hidden || !node) return;
      const next = node.children[cursor.current + 1] as HTMLElement | undefined;
      if (next) node.scrollTo({ left: next.offsetLeft, behavior: getPaused() ? 'auto' : 'smooth' });
    }, 5200);
    return () => clearInterval(timer);
  }, [paused, held]);
  const shot = heroShots[active] ?? heroShots[0];
  return <div className="hero-stage" onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)} onFocusCapture={() => setHeld(true)} onBlurCapture={() => setHeld(false)}>
    <div className="photo-meta"><span>{shot.label}</span></div>
    <figure className="hero-photo">
      <div className="hero-track" ref={track} onScroll={measure} tabIndex={0} role="group" aria-label="Fotos dos bastidores da Tudo Aqui, lista rolável na horizontal">
        {loop.map((item, index) => <img
          key={item.src + index}
          className="hero-slide"
          aria-hidden={index >= heroShots.length}
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          style={{ objectPosition: item.focus }}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          loading={index === 0 ? 'eager' : 'lazy'}
        />)}
      </div>
      <div className="photo-corner corner-top"/>
      <div className="photo-corner corner-bottom"/>
      <figcaption>{shot.caption}</figcaption>
    </figure>
    <p className="hero-mobile-caption">{shot.caption}</p>
    <div className="hero-dots">
      <div className="dot-row">
        {heroShots.map((item, index) => <button
          key={item.src}
          type="button"
          className="hero-dot"
          onClick={() => go((cursor.current >= heroShots.length ? heroShots.length : 0) + index)}
          aria-current={index === active}
          aria-label={`Ver a foto ${index + 1} de ${heroShots.length}: ${item.caption}`}
        />)}
      </div>
    </div>
  </div>;
}

function Rail() {
  const track = useRef<HTMLDivElement>(null);
  // Duas cópias da lista: a volta acontece sempre ANTES de rolar, nunca no meio da
  // animação, então a emenda entre a última e a primeira não aparece.
  const loop = [...rail, ...rail];
  const animating = useRef(false);
  function cardStep(node: HTMLDivElement) {
    const card = node.querySelector('.rail-card');
    return card ? card.getBoundingClientRect().width + 24 : node.clientWidth * .8;
  }
  // A volta só acontece com a rolagem parada: cortar meia pista no meio da inércia
  // do trackpad faz o scroll-snap re-encaixar e dá um salto visível.
  const settle = useRef<ReturnType<typeof setTimeout>>(undefined);
  function measure() {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const node = track.current;
      if (!node || animating.current || drag.current.active) return;
      const half = node.scrollWidth / 2;
      if (half && node.scrollLeft >= half) node.scrollLeft -= half;
    }, 130);
  }
  function step(direction: 1 | -1) {
    const node = track.current;
    if (!node) return;
    const width = cardStep(node);
    const half = node.scrollWidth / 2;
    if (direction === 1 && node.scrollLeft + width >= half) node.scrollLeft -= half;
    if (direction === -1 && node.scrollLeft < width) node.scrollLeft += half;
    animating.current = true;
    setTimeout(() => { animating.current = false; }, 700);
    node.scrollBy({ left: width * direction, behavior: getPaused() ? 'auto' : 'smooth' });
  }
  const drag = useRef({ active: false, x: 0, left: 0 });
  function grab(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const node = event.currentTarget;
    drag.current = { active: true, x: event.clientX, left: node.scrollLeft };
    node.classList.add('is-dragging');
    node.setPointerCapture(event.pointerId);
  }
  function pull(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    const node = event.currentTarget;
    const half = node.scrollWidth / 2;
    const next = drag.current.left - (event.clientX - drag.current.x);
    node.scrollLeft = half ? ((next % half) + half) % half : next;
  }
  function release(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    drag.current.active = false;
    event.currentTarget.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return <div className="rail">
    <div className="rail-head">
      <p>Arraste para o lado ou use as setas. Seis dos negócios que aparecem no feed da agência.</p>
      <div className="rail-controls">
        <button type="button" className="rail-button" onClick={() => step(-1)} aria-label="Ver os casos anteriores"><ArrowLeftIcon/></button>
        <button type="button" className="rail-button" onClick={() => step(1)} aria-label="Ver os próximos casos"><ArrowRightIcon/></button>
      </div>
    </div>
    <div className="rail-track" ref={track} onScroll={measure} onPointerDown={grab} onPointerMove={pull} onPointerUp={release} onPointerCancel={release} tabIndex={0} role="group" aria-label="Casos de clientes, lista rolável na horizontal">
      {loop.map((item, index) => <article className="rail-card" key={item.name + index} aria-hidden={index >= rail.length}>
        <p className="rail-seg">{item.seg}</p>
        <p className="rail-metric"><strong>{item.metric}</strong><span>{item.unit}</span></p>
        <div className="rail-brand">{item.logo ? <img src={item.logo} alt="" width="44" height="44" loading="lazy"/> : <span className="rail-monogram" aria-hidden="true">{item.name.charAt(0)}</span>}<h3>{item.name}</h3></div>
        <p className="rail-did">{item.did}</p>
        <p className="rail-note">{item.note}</p>
        <a className="text-link" href={`https://www.instagram.com/${item.handle}/`} target="_blank" rel="noopener noreferrer" tabIndex={index >= rail.length ? -1 : undefined}>Ver o perfil <Arrow/></a>
      </article>)}
    </div>
  </div>;
}

function ServiceList() {
  const [openService, setOpenService] = useState<number | null>(0);
  return <div className="service-list">{services.map((service, index) => {
    const isOpen = openService === index;
    const panelId = `service-panel-${index}`;
    return <div className={`service-row reveal${isOpen ? ' is-open' : ''}`} key={service.number}>
      <button className="service-trigger" type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenService(current => current === index ? null : index)}><span className="service-number">{service.number}</span><span className="service-heading"><span className="service-label">{service.label}</span><span className="service-title">{service.title}</span></span><span className="expand-symbol" aria-hidden="true"><span className="plus-icon"/></span></button>
      <div className="disclosure-panel service-panel" id={panelId} aria-hidden={!isOpen}><div className="disclosure-panel-inner"><div className="service-content"><div className={`service-sculpture ${service.shape}`} aria-hidden="true"><span/><span/><span/></div><div><p>{service.description}</p><ul className="service-tags">{service.items.map(item => <li key={item}>{item}</li>)}</ul><a className="text-link" href={service.link} tabIndex={isOpen ? 0 : -1}>{service.proof} <Arrow/></a></div></div></div></div>
    </div>;
  })}</div>;
}

function Faq() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  return <section className="faq-section wrap section"><div className="reveal"><p className="eyebrow">05 / ANTES DA PRIMEIRA CONVERSA</p><h2>Talvez você<br/><span className="serif-accent">esteja pensando…</span></h2></div><div className="faq-list">{faqItems.map(({ question, answer }, index) => {
    const isOpen = openQuestion === index;
    const panelId = `faq-panel-${index}`;
    return <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={question}><button className="faq-trigger" type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenQuestion(current => current === index ? null : index)}><span>{question}</span><span className="faq-symbol" aria-hidden="true"><span className="plus-icon"/></span></button><div className="disclosure-panel faq-panel" id={panelId} aria-hidden={!isOpen}><div className="disclosure-panel-inner"><p>{answer}</p></div></div></div>;
  })}</div></section>;
}

function Reviews() {
  return <section className="reviews-section wrap section" id="avaliacoes">
    <div className="section-heading reveal">
      <div><p className="eyebrow">04 / O QUE OS CLIENTES ESCREVERAM</p><h2>Avaliações<br/><span className="serif-accent">no Google.</span></h2></div>
      <p>Duas avaliações de 5 estrelas que a própria agência publicou em seus stories. O texto está na íntegra.</p>
    </div>
    <div className="review-list">
      {reviews.map(review => <figure className="review-card reveal" key={review.who}>
        <p className="review-stars" aria-label="Avaliação de 5 estrelas"><span aria-hidden="true">{Array.from({length: 5}, (_, index) => <StarIcon key={index}/>)}</span></p>
        <blockquote>{review.text}</blockquote>
        <figcaption><strong>{review.who}</strong><span>{review.from}</span><span className="review-source">{review.when}</span></figcaption>
      </figure>)}
    </div>
    <p className="review-cta"><a className="button button-dark" href={googleReview} target="_blank" rel="noopener noreferrer">Avaliar a Tudo Aqui no Google <Arrow/></a></p>
  </section>;
}

function Diagnostic() {
  const diagnosticMessage = 'Olá, Tudo Aqui! Vim pelo site e ganhei um diagnóstico gratuito. Quero analisar a presença digital da minha marca e entender quais devem ser os próximos passos. Como podemos começar?';

  return <section className="diagnostic-section" aria-labelledby="diagnostic-title">
    <div className="wrap diagnostic-grid">
      <div>
        <p className="eyebrow">UM PRIMEIRO OLHAR, POR NOSSA CONTA</p>
        <h2 id="diagnostic-title">Você ganhou um<br/><span className="serif-accent">diagnóstico gratuito.</span></h2>
      </div>
      <div className="diagnostic-copy">
        <p>Em uma conversa rápida, a gente olha sua presença digital e aponta os próximos passos para a sua marca.</p>
        <a href={`${whatsapp}?text=${encodeURIComponent(diagnosticMessage)}`} className="button diagnostic-cta" target="_blank" rel="noopener noreferrer">Quero fazer um diagnóstico gratuito <Arrow/></a>
      </div>
    </div>
  </section>;
}

function Contact() {
  const [interest, setInterest] = useState('Quero entender o que minha marca precisa');
  const interestMessages: Record<string, string> = {
    'Quero entender o que minha marca precisa': 'Olá, Tudo Aqui! Vim pelo site e quero entender o que a minha marca precisa neste momento. Podemos conversar sobre os próximos passos?',
    'Identidade e presença digital': 'Olá, Tudo Aqui! Vim pelo site e quero organizar a identidade e a presença digital da minha marca. Gostaria de contar um pouco sobre o negócio e entender como vocês podem ajudar.',
    'Fotos, vídeos e conteúdo': 'Olá, Tudo Aqui! Vim pelo site e estou buscando fotos, vídeos e conteúdo com mais direção para o meu negócio. Podemos conversar sobre o projeto?',
    'Gestão de redes e estratégia': 'Olá, Tudo Aqui! Vim pelo site e quero melhorar a gestão das redes e ter uma estratégia com continuidade. Gostaria de entender como funciona o trabalho de vocês.',
  };
  const message = interestMessages[interest] ?? interestMessages['Quero entender o que minha marca precisa'];
  return <section className="contact-section" id="contato"><div className="wrap contact-grid">
    <div><p className="eyebrow">06 / O PRÓXIMO CAPÍTULO</p><h2>Agora, a gente<br/>quer conhecer<br/><span>o seu negócio.</span></h2><p>Conta pra gente o que acontece aí.<br/>Vamos descobrir juntos o próximo passo.</p></div>
    <div className="contact-action"><InterestPicker value={interest} onChange={setInterest}/><a href={`${whatsapp}?text=${encodeURIComponent(message)}`} className="button button-dark contact-interest-cta" target="_blank" rel="noopener noreferrer">Conversar sobre este objetivo <Arrow/></a><p>Uma conversa sobre o seu momento.<br/>Sem precisar chegar com tudo resolvido.</p><a className="text-link" href="https://www.instagram.com/tudoaqui_marketing/" target="_blank" rel="noopener noreferrer">Ou encontre a gente no Instagram <Arrow/></a></div>
  </div><div className="contact-background" aria-hidden="true">aqui.</div></section>;
}

export default function Landing() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => { if (query.matches) { document.documentElement.dataset.motion = 'off'; window.dispatchEvent(new Event('tam-preferences')); } };
    query.addEventListener('change', onMotion);
    return () => { observer.disconnect(); query.removeEventListener('change', onMotion); };
  }, []);

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="playhead" aria-hidden="true"><span className="playhead-bar"/></div>
    <header className="site-header wrap">
      <a className="brand" href="#inicio" aria-label="Tudo Aqui Marketing Digital, início"><BrandLogo/></a>
      <nav aria-label="Navegação principal"><a href="#servicos">O que fazemos</a><a href="#casos">Quem está com a gente</a><a href="#contato" className="nav-cta">Vamos conversar <Arrow/></a></nav>
      <Controls/>
    </header>
    <main id="conteudo">
      <section className="hero wrap" aria-labelledby="hero-title" id="inicio">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot"/> MARKETING PERTO DE QUEM FAZ.</p><h1 id="hero-title">Seu negócio<br/>tem muito<br/>para <span className="highlight">mostrar.</span></h1><p className="hero-description">Da primeira ideia à presença de todo dia.<br/>Estratégia, identidade e conteúdo que colocam<br className="desktop-break"/> a sua história em movimento.</p><a className="button button-dark" href="#servicos">Encontre seu próximo passo <Arrow/></a><div className="hero-footnote"><span className="tiny-line"/> IDEIAS NO PAPEL. SUA MARCA NO MUNDO.</div></div>
        <Tilt className="hero-art"><div className="art-backplate" aria-hidden="true"/><HeroCarousel/><div className="floating-tag">ESTRATÉGIA + CRIATIVIDADE <Arrow/></div><div className="yellow-note"><Arrow/><p>A gente entra<br/>na sua rotina.<br/><strong>A sua marca<br/>entra em cena.</strong></p></div><div className="cube-scene" aria-hidden="true"><div className="cube"><span className="cube-front"><b>01</b>começar</span><span className="cube-left"><b>02</b>aparecer</span><span className="cube-back"><b>03</b>continuar</span><span className="cube-right">tudo<br/>aqui.</span><span className="cube-top"><SparkIcon/></span><span className="cube-bottom"><Arrow/></span></div></div></Tilt>
      </section>

      <section className="client-section wrap reveal" aria-label="Algumas marcas atendidas pela Tudo Aqui"><div className="client-caption"><p>NEGÓCIOS REAIS.<br/><strong>HISTÓRIAS QUE SE ENCONTRAM AQUI.</strong></p><ArrowDownRightIcon/></div><div className="client-logos">{clients.map(client => <a className="client-logo" key={client.name} href={`https://www.instagram.com/${client.handle}/`} target="_blank" rel="noopener noreferrer"><img src={client.image} alt={`Logo ${client.name}`} width="82" height="82" loading="lazy"/><span>{client.name}<small>{client.field}</small></span><span className="client-arrow" aria-hidden="true"><Arrow/></span></a>)}</div></section>

      <div className="service-strip" aria-label="Ideia boa, conteúdo com direção e presença de verdade"><div className="marquee-track" aria-hidden="true">{[0,1,2,3,4,5].map(n => <div className="marquee-group" key={n}><span>IDEIA BOA</span><SparkIcon/><span>CONTEÚDO COM DIREÇÃO</span><SparkIcon/><span>PRESENÇA DE VERDADE</span><SparkIcon/><span>TUDO AQUI</span><SparkIcon/></div>)}</div></div>

      <section className="services wrap section" id="servicos"><div className="section-heading reveal"><div><p className="eyebrow">01 / O QUE FAZEMOS</p><h2>Cada negócio,<br/><span className="serif-accent">um momento.</span></h2></div><p>Para começar, aparecer ou ter alguém acompanhando. A gente encontra o caminho junto com você.</p></div><ServiceList/></section>

      <section className="work-section" id="casos"><div className="wrap section"><div className="section-heading reveal"><div><p className="eyebrow">02 / QUEM ESTÁ COM A GENTE</p><h2>Mais que projetos.<br/><span className="serif-accent">Histórias em comum.</span></h2></div><p>O trabalho ganha sentido quando faz parte da trajetória de quem confia na gente.</p></div><Tilt className="featured-case"><div className="case-number"><span className="eyebrow">CONTEÚDO QUE ABRE CONVERSAS</span><strong>822<Arrow/></strong><p>cliques para contato em 90 dias</p><span className="case-source">Resultado divulgado em junho de 2026.</span></div><div className="case-story"><div className="case-brand"><img src="/logos/johan.jpg" alt="Logo Johan Veículos" width="64" height="64" loading="lazy"/><span>JOHAN VEÍCULOS<small>ESTRATÉGIA + CONTEÚDO + GESTÃO</small></span></div><h3>Uma parceria<br/>que segue em frente.</h3><p>Conteúdo educativo, produção de vídeos e acompanhamento. Uma relação que ganhou continuidade, com renovações e evolução do plano contratado.</p><a className="text-link" href="https://www.instagram.com/tudoaqui_marketing/p/DZclExJFrI1/" target="_blank" rel="noopener noreferrer">Conheça o caso publicado <Arrow/></a></div></Tilt><Rail/><p className="work-footnote">Histórias e dados do levantamento de setembro de 2026. Cliques para contato não equivalem a vendas, e alcance não equivale a faturamento.</p></div></section>

      <section className="about-section wrap section" id="por-perto"><Tilt className="about-photo"><img src="/images/bastidores.jpg" alt="Registro publicado pela Tudo Aqui na Seven Barber, durante a formalização da parceria" width="900" height="1200" loading="lazy"/><span className="photo-index">NA ROTINA DE QUEM FAZ. <Arrow/></span><span className="about-sticker" aria-hidden="true">gente<br/>com<br/>gente.</span></Tilt><div className="about-copy reveal"><p className="eyebrow">03 / NOSSO JEITO DE TRABALHAR</p><h2>Para contar<br/>sua história,<br/><span className="serif-accent">a gente chega perto.</span></h2><p>Antes do roteiro, tem conversa. Antes da câmera, tem uma ideia. E antes de qualquer estratégia, tem o seu negócio.</p><p>A Tudo Aqui combina planejamento, produção e acompanhamento para construir uma comunicação com a sua cara.</p><ol className="process-list"><li><span>01</span><div><strong>A gente escuta.</strong><p>Entende seu momento e o que você quer construir.</p></div></li><li><span>02</span><div><strong>A gente coloca em movimento.</strong><p>Transforma o plano em identidade, conteúdo e presença.</p></div></li><li><span>03</span><div><strong>A gente acompanha.</strong><p>Conversa sobre o trabalho e ajusta os próximos passos.</p></div></li></ol></div></section>

      <section className="quote-section"><div className="wrap reveal"><span className="quote-mark" aria-hidden="true">“</span><blockquote>Além de trabalhar muito e entregar resultados, deixa o ambiente mais leve, saudável e descontraído.</blockquote><p><strong>Marlon França</strong><span>Johan Veículos · depoimento publicado</span></p></div></section>

      <Reviews/>

      <Faq/>

      <Diagnostic/>

      <Contact/>
    </main>
    <footer className="site-footer wrap"><a className="brand" href="#inicio" aria-label="Tudo Aqui Marketing Digital, voltar ao topo"><BrandLogo className="is-footer"/></a><p>Estratégia. Conteúdo. Gente de verdade.</p><a href="https://www.instagram.com/tudoaqui_marketing/" target="_blank" rel="noopener noreferrer">Instagram <Arrow/></a></footer>
    <div className="credit wrap"><span>Desenvolvido pela</span><QuazzLogo/></div>
  </>;
}
