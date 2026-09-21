'use client';

import { useEffect, useRef } from 'react';

const options = [
  'Quero entender o que minha marca precisa',
  'Identidade e presença digital',
  'Fotos, vídeos e conteúdo',
  'Gestão de redes e estratégia',
];

export function InterestPicker({ value, onChange }: {
  value: string;
  onChange: (value: string) => void;
}) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOutside = (event: globalThis.PointerEvent) => {
      if (disclosure.current && event.target instanceof Node && !disclosure.current.contains(event.target)) {
        disclosure.current.open = false;
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  function close() {
    if (disclosure.current) disclosure.current.open = false;
    trigger.current?.focus();
  }

  return <>
    <span className="interest-label" id="interest-label">POR ONDE VOCÊ QUER COMEÇAR?</span>
    <details
      className="interest-picker"
      ref={disclosure}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
      onKeyDown={event => {
        if (event.key === 'Escape' && event.currentTarget.open) {
          event.preventDefault();
          close();
        }
      }}
    >
      <summary ref={trigger} aria-labelledby="interest-label interest-value">
        <span id="interest-value">{value}</span>
        <span className="interest-chevron" aria-hidden="true" />
      </summary>
      <div className="interest-options" role="group" aria-labelledby="interest-label">
        {options.map(option => <button
          type="button"
          key={option}
          aria-pressed={option === value}
          onClick={() => {
            onChange(option);
            close();
          }}
        >
          <span>{option}</span>
          <span className="interest-check" aria-hidden="true">{option === value ? '✓' : ''}</span>
        </button>)}
      </div>
    </details>
  </>;
}
