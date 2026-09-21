'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type PointerEvent } from 'react';

const whatsapp = 'https://wa.me/5521999888061';
const clients = [
  { name: 'Johan Veículos', image: '/logos/johan.jpg', handle: 'johan.veiculos', field: 'AUTOMOTIVO' },
  { name: 'El Hombre', image: '/logos/el-hombre.png', handle: 'barbearia_elhombre', field: 'BARBEARIA' },
  { name: 'Club Alfa', image: '/logos/club-alfa.png', handle: 'barbearia_clubalfa', field: 'BARBEARIA' },
  { name: 'Café da Vila', image: '/logos/cafe-da-vila.jpg', handle: 'cafedavila21', field: 'ALIMENTAÇÃO' },
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
    <button className="icon-button motion-toggle" onClick={() => change('motion', paused ? 'on' : 'off')} aria-pressed={paused} aria-label={paused ? 'Retomar animações' : 'Pausar animações'} title={paused ? 'Retomar animações' : 'Pausar animações'}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button>
    <button className="theme-toggle" onClick={() => change('theme', dark ? 'light' : 'dark')} aria-pressed={dark} aria-label="Ativar modo escuro" title={dark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}><span className="theme-sun" aria-hidden="true">☀</span><span className="theme-moon" aria-hidden="true">☾</span><span className="theme-thumb" /></button>
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

function Arrow() { return <span aria-hidden="true">↗</span>; }

function Contact() {
  const [interest, setInterest] = useState('Quero entender o que minha marca precisa');
  const options = ['Quero entender o que minha marca precisa', 'Identidade e presença digital', 'Fotos, vídeos e conteúdo', 'Gestão de redes e estratégia'];
  const message = `Olá, Tudo Aqui! Conheci o trabalho de vocês pelo site. ${interest}. Vamos conversar?`;
  return <section className="contact-section" id="contato"><div className="wrap contact-grid">
    <div><p className="eyebrow">05 / O PRÓXIMO CAPÍTULO</p><h2>Agora, a gente<br/>quer conhecer<br/><span>o seu negócio.</span></h2><p>Conta pra gente o que acontece aí.<br/>Vamos descobrir juntos o próximo passo.</p></div>
    <div className="contact-action"><label htmlFor="interest">POR ONDE VOCÊ QUER COMEÇAR?</label><select id="interest" value={interest} onChange={e => setInterest(e.target.value)}>{options.map(option => <option key={option}>{option}</option>)}</select><a href={`${whatsapp}?text=${encodeURIComponent(message)}`} className="button button-dark" target="_blank" rel="noopener noreferrer">Vamos conversar no WhatsApp <Arrow/></a><p>Uma conversa sobre o seu momento.<br/>Sem precisar chegar com tudo resolvido.</p><a className="text-link" href="https://www.instagram.com/tudoaqui_marketing/" target="_blank" rel="noopener noreferrer">Ou encontre a gente no Instagram <Arrow/></a></div>
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
    <header className="site-header wrap">
      <a className="brand" href="#inicio" aria-label="Tudo Aqui Marketing — início"><img src="/logos/tudo-aqui.jpg" alt="" width="49" height="49"/><span className="wordmark">tudo aqui<span className="brand-dot">.</span><small>MARKETING</small></span></a>
      <nav aria-label="Navegação principal"><a href="#servicos">O que fazemos</a><a href="#casos">Quem está com a gente</a><a href="#contato" className="nav-cta">Vamos conversar <Arrow/></a></nav>
      <Controls/>
    </header>
    <main id="conteudo">
      <section className="hero wrap" aria-labelledby="hero-title" id="inicio">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot"/> MARKETING PERTO DE QUEM FAZ.</p><h1 id="hero-title">Seu negócio<br/>tem muito<br/>para <span className="highlight">mostrar.</span></h1><p className="hero-description">Da primeira ideia à presença de todo dia.<br/>Estratégia, identidade e conteúdo que colocam<br className="desktop-break"/> a sua história em movimento.</p><a className="button button-dark" href="#servicos">Encontre seu próximo passo <Arrow/></a><div className="hero-footnote"><span className="tiny-line"/> IDEIAS NO PAPEL. SUA MARCA NO MUNDO.</div></div>
        <Tilt className="hero-art"><div className="art-backplate" aria-hidden="true"/><div className="photo-meta"><span>CRIATIVIDADE EM MOVIMENTO</span><span>RIO DE JANEIRO ↗</span></div><figure className="hero-photo"><img src="/images/producao.jpg" alt="Referência de produção audiovisual: profissional operando uma câmera" fetchPriority="high" width="1000" height="1400"/><div className="photo-corner corner-top"/><div className="photo-corner corner-bottom"/><span className="rec-label"><i/> REC</span><figcaption>O trabalho começa antes do REC.</figcaption></figure><div className="floating-tag">ESTRATÉGIA + CRIATIVIDADE <Arrow/></div><div className="yellow-note"><span aria-hidden="true">↗</span><p>A gente entra<br/>na sua rotina.<br/><strong>A sua marca<br/>entra em cena.</strong></p></div><div className="cube-scene" aria-hidden="true"><div className="cube"><span className="cube-front">tudo<br/>aqui.</span><span className="cube-back">ideia<br/>boa.</span><span className="cube-right">↗</span><span className="cube-left">✳</span><span className="cube-top">TA.</span><span className="cube-bottom">↗</span></div></div><span className="image-disclaimer">Imagem de referência · Kyle Loftus / Unsplash</span></Tilt>
      </section>

      <section className="client-section wrap reveal" aria-label="Algumas marcas atendidas pela Tudo Aqui"><div className="client-caption"><p>NEGÓCIOS REAIS.<br/><strong>HISTÓRIAS QUE SE ENCONTRAM AQUI.</strong></p><span aria-hidden="true">↘</span></div><div className="client-logos">{clients.map(client => <a className="client-logo" key={client.name} href={`https://www.instagram.com/${client.handle}/`} target="_blank" rel="noopener noreferrer"><img src={client.image} alt={`Logo ${client.name}`} width="82" height="82" loading="lazy"/><span>{client.name}<small>{client.field}</small></span><span className="client-arrow" aria-hidden="true">↗</span></a>)}</div></section>

      <div className="service-strip" aria-label="Ideia boa, conteúdo com direção e presença de verdade"><div className="marquee-track" aria-hidden="true">{[0,1].map(n => <div className="marquee-group" key={n}><span>IDEIA BOA</span><i>✳</i><span>CONTEÚDO COM DIREÇÃO</span><i>✳</i><span>PRESENÇA DE VERDADE</span><i>✳</i><span>TUDO AQUI</span><i>✳</i></div>)}</div></div>

      <section className="services wrap section" id="servicos"><div className="section-heading reveal"><div><p className="eyebrow">01 / O QUE FAZEMOS</p><h2>Cada negócio,<br/><span className="serif-accent">um momento.</span></h2></div><p>Para começar, aparecer ou ter alguém acompanhando. A gente encontra o caminho junto com você.</p></div><div className="service-list">{services.map((service, i) => <details className="service-row reveal" name="services" key={service.number} open={i===0}><summary><span className="service-number">{service.number}</span><div><span className="service-label">{service.label}</span><h3>{service.title}</h3></div><span className="expand-symbol" aria-hidden="true">+</span></summary><div className="service-content"><div className={`service-sculpture ${service.shape}`} aria-hidden="true"><span/><span/><span/></div><div><p>{service.description}</p><ul className="service-tags">{service.items.map(item => <li key={item}>{item}</li>)}</ul><a className="text-link" href={service.link}>{service.proof} <Arrow/></a></div></div></details>)}</div></section>

      <section className="work-section" id="casos"><div className="wrap section"><div className="section-heading reveal"><div><p className="eyebrow">02 / QUEM ESTÁ COM A GENTE</p><h2>Mais que projetos.<br/><span className="serif-accent">Histórias em comum.</span></h2></div><p>O trabalho ganha sentido quando faz parte da trajetória de quem confia na gente.</p></div><Tilt className="featured-case"><div className="case-number"><span className="eyebrow">CONTEÚDO QUE ABRE CONVERSAS</span><strong>822<span>↗</span></strong><p>cliques para contato em 90 dias</p><span className="case-source">Resultado divulgado em junho de 2026.</span></div><div className="case-story"><div className="case-brand"><img src="/logos/johan.jpg" alt="Logo Johan Veículos" width="64" height="64" loading="lazy"/><span>JOHAN VEÍCULOS<small>ESTRATÉGIA + CONTEÚDO + GESTÃO</small></span></div><h3>Uma parceria<br/>que segue em frente.</h3><p>Conteúdo educativo, produção de vídeos e acompanhamento. Uma relação que ganhou continuidade, com renovações e evolução do plano contratado.</p><a className="text-link" href="https://www.instagram.com/tudoaqui_marketing/p/DZclExJFrI1/" target="_blank" rel="noopener noreferrer">Conheça o caso publicado <Arrow/></a></div></Tilt><div className="case-duo"><article className="small-case reveal"><div className="case-brand"><img src="/logos/cafe-da-vila.jpg" alt="Logo Café da Vila" width="56" height="56" loading="lazy"/><span>CAFÉ DA VILA<small>IDENTIDADE + PRESENÇA DIGITAL</small></span></div><h3>Uma marca começando<br/>a contar sua história.</h3><p>Criação de identidade visual, Instagram e mini site. Uma presença digital construída desde o começo.</p><a className="text-link" href="https://www.instagram.com/cafedavila21/" target="_blank" rel="noopener noreferrer">Conheça a marca <Arrow/></a></article><article className="small-case reveal"><div className="case-brand"><img src="/logos/el-hombre.png" alt="Logo El Hombre" width="56" height="56" loading="lazy"/><span>EL HOMBRE<small>CONTEÚDO + ACOMPANHAMENTO</small></span></div><h3>O dia a dia também<br/>rende boas histórias.</h3><p>Planejamento, gravações e conteúdo que acompanham a rotina de uma barbearia. Uma parceria construída ao longo de aproximadamente dois anos.</p><a className="text-link" href="https://www.instagram.com/barbearia_elhombre/" target="_blank" rel="noopener noreferrer">Conheça a marca <Arrow/></a></article></div><p className="work-footnote">Histórias e dados do levantamento de setembro de 2026. Cliques para contato não equivalem a vendas.</p></div></section>

      <section className="about-section wrap section" id="por-perto"><Tilt className="about-photo"><img src="/images/bastidores.jpg" alt="Registro publicado pela Tudo Aqui na Seven Barber, durante a formalização da parceria" width="900" height="1200" loading="lazy"/><span className="photo-index">NA ROTINA DE QUEM FAZ. ↗</span><span className="about-sticker" aria-hidden="true">gente<br/>com<br/>gente.</span></Tilt><div className="about-copy reveal"><p className="eyebrow">03 / NOSSO JEITO DE TRABALHAR</p><h2>Para contar<br/>sua história,<br/><span className="serif-accent">a gente chega perto.</span></h2><p>Antes do roteiro, tem conversa. Antes da câmera, tem uma ideia. E antes de qualquer estratégia, tem o seu negócio.</p><p>A Tudo Aqui combina planejamento, produção e acompanhamento para construir uma comunicação com a sua cara.</p><ol className="process-list"><li><span>01</span><div><strong>A gente escuta.</strong><p>Entende seu momento e o que você quer construir.</p></div></li><li><span>02</span><div><strong>A gente coloca em movimento.</strong><p>Transforma o plano em identidade, conteúdo e presença.</p></div></li><li><span>03</span><div><strong>A gente acompanha.</strong><p>Conversa sobre o trabalho e ajusta os próximos passos.</p></div></li></ol></div></section>

      <section className="quote-section"><div className="wrap reveal"><span className="quote-mark" aria-hidden="true">“</span><blockquote>Além de trabalhar muito e entregar resultados, deixa o ambiente mais leve, saudável e descontraído.</blockquote><p><strong>Marlon França</strong><span>Johan Veículos · depoimento publicado</span></p></div></section>

      <section className="faq-section wrap section"><div className="reveal"><p className="eyebrow">04 / ANTES DA PRIMEIRA CONVERSA</p><h2>Talvez você<br/><span className="serif-accent">esteja pensando…</span></h2></div><div className="faq-list"><details><summary>Preciso contratar todos os serviços?<span aria-hidden="true">+</span></summary><p>A conversa começa pela sua necessidade. A agência atua em identidade, presença digital, produção de conteúdo e gestão. O escopo é definido de acordo com o projeto.</p></details><details><summary>Meu negócio está começando. Faz sentido?<span aria-hidden="true">+</span></summary><p>Sim. O Café da Vila é um exemplo de presença estruturada desde o início, com identidade, Instagram e mini site. Podemos conversar sobre o que precisa vir primeiro na sua empresa.</p></details><details><summary>Vocês também fazem fotos e vídeos?<span aria-hidden="true">+</span></summary><p>Sim. Produção audiovisual e fotografia fazem parte do trabalho. Formato, quantidade, local e agenda de captação são combinados na proposta.</p></details><details><summary>Como recebo uma proposta?<span aria-hidden="true">+</span></summary><p>Fale com a equipe pelo WhatsApp. Conte sobre o seu negócio e o que procura para que a Tudo Aqui entenda o projeto e apresente uma proposta.</p></details></div></section>

      <Contact/>
    </main>
    <footer className="site-footer wrap"><a className="brand" href="#inicio"><img src="/logos/tudo-aqui.jpg" alt="" width="40" height="40"/><span className="wordmark">tudo aqui.<small>MARKETING</small></span></a><p>Estratégia. Conteúdo. Gente de verdade.</p><a href="https://www.instagram.com/tudoaqui_marketing/" target="_blank" rel="noopener noreferrer">Instagram <Arrow/></a><span className="prototype-note">Protótipo criativo · 2026</span></footer>
  </>;
}
