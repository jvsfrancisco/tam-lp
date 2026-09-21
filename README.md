# Tudo Aqui Marketing — protótipo de landing page

Protótipo editorial em português, com modos claro e escuro, preferência persistente, camadas com perspectiva, cubo CSS 3D, movimento reduzido, logos reais e apresentação de toda a atuação da agência.

## Desenvolvimento

Use Node 22.13 ou superior e npm. Neste ambiente, execute comandos pelo RTK:

```sh
rtk exec -- 'npm install'
rtk exec -- 'npm run dev -- --host 0.0.0.0'
rtk build -- 'npm run build'
rtk exec -- 'npx tsc --noEmit'
```

O site usa React, Vinext/Vite e a integração Sites. `app/landing.tsx` reúne o conteúdo e as interações. `app/globals.css` define os dois temas e a composição responsiva. `app/layout.tsx` aplica a preferência de tema antes da hidratação.

## Interações

- Alternância de tema com preferência salva localmente; primeira visita respeita o sistema.
- Controle para pausar animações; `prefers-reduced-motion` também é respeitado.
- Perspectiva por ponteiro somente em dispositivos com mouse e movimento permitido.
- Serviços e perguntas expansíveis com elementos nativos `details`.
- Seleção da necessidade altera a mensagem preparada no link do WhatsApp. A página não envia mensagens automaticamente e não coleta dados.

## Fontes e acervo

Conteúdo: `../Analise-Clientes-Tudo-Aqui.pdf` e `../ESTUDO-CRIATIVO-LP.md`. A apresentação completa da agência foi escolhida pelo usuário.

Materiais consultados em 21/09/2026:

- Tudo Aqui: https://www.instagram.com/tudoaqui_marketing/ — avatar oficial usado junto ao nome em texto; a bio confirma estratégia, conteúdo e tráfego pago.
- Contato oficial: https://linktr.ee/tudoaquimarketingdigital — link do WhatsApp exibido pela agência.
- Johan: https://www.instagram.com/johan.veiculos/ — avatar oficial.
- Caso Johan: https://www.instagram.com/tudoaqui_marketing/p/DZclExJFrI1/ — publicação indicada no levantamento. Os 822 são cliques para contato em 90 dias, não vendas.
- El Hombre: https://barbeariaelhombre.github.io/ELHOMBRE/ — `imagens/logo2.png`, logo oficial no site da barbearia.
- Club Alfa: https://linktr.ee/barbeariaclubalfa — imagem oficial de perfil, com link para `@barbearia_clubalfa`.
- Café da Vila: https://www.instagram.com/cafedavila21/ — avatar oficial.
- Registro da parceria com Seven Barber: https://www.instagram.com/tudoaqui_marketing/p/DalaZmmGBg-/ — `public/images/bastidores.jpg`.
- Abertura: Kyle Loftus, https://unsplash.com/photos/man-holding-video-camera-yMemQcLR8T4 — fotografia de referência explicitamente identificada no protótipo; não representa a equipe da agência.
- Imagem de compartilhamento: arte tipográfica gerada especificamente para o protótipo.

Os logos mantêm as cores originais em ambos os temas. Avatares do Instagram têm resolução limitada; substituir pelos arquivos originais quando disponíveis. A assinatura textual é uma composição provisória, acompanhada do símbolo oficial.

## Antes da versão final

Confirmar escopos e textos comerciais; substituir a fotografia de referência da abertura pelo acervo aprovado da agência; obter logos em alta resolução; confirmar uso final dos depoimentos e dados. Não há preços ou garantias de resultado inventados. O protótipo usa `noindex`.

Os arquivos de estudo e o PDF não são incluídos no site. Caches, logs RTK, dependências e saídas de build não devem ser versionados.
