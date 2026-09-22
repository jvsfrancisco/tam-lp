'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckIcon } from './ui-icons';

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
  const [open, setOpen] = useState(false);
  const disclosure = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOutside = (event: globalThis.PointerEvent) => {
      if (disclosure.current && event.target instanceof Node && !disclosure.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  return <>
    <span className="interest-label" id="interest-label">POR ONDE VOCÊ QUER COMEÇAR?</span>
    <div
      className={`interest-picker${open ? ' is-open' : ''}`}
      ref={disclosure}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={event => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          close();
        }
      }}
    >
      <button className="interest-trigger" type="button" ref={trigger} aria-expanded={open} aria-controls="interest-options" aria-labelledby="interest-label interest-value" onClick={() => setOpen(current => !current)}>
        <span id="interest-value">{value}</span>
        <span className="interest-chevron" aria-hidden="true" />
      </button>
      <div className="disclosure-panel interest-panel" id="interest-options" aria-hidden={!open}>
        <div className="disclosure-panel-inner interest-options" role="group" aria-labelledby="interest-label">
          {options.map(option => <button
            type="button"
            key={option}
            aria-pressed={option === value}
            tabIndex={open ? 0 : -1}
            onClick={() => {
              onChange(option);
              close();
            }}
          >
            <span>{option}</span>
            <span className="interest-check" aria-hidden="true">{option === value && <CheckIcon />}</span>
          </button>)}
        </div>
      </div>
    </div>
  </>;
}
