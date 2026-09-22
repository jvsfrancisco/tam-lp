import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, className = '', ...props }: IconProps) {
  return <svg
    aria-hidden="true"
    className={`ui-icon ${className}`}
    fill="none"
    focusable="false"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    {...props}
  >{children}</svg>;
}

export function ArrowUpRightIcon(props: IconProps) {
  return <Icon {...props}><path d="M6 18 18 6M8 6h10v10" /></Icon>;
}

export function ArrowDownRightIcon(props: IconProps) {
  return <Icon {...props}><path d="m6 6 12 12M18 8v10H8" /></Icon>;
}

export function ArrowLeftIcon(props: IconProps) {
  return <Icon {...props}><path d="m10 6-6 6 6 6M4 12h16" /></Icon>;
}

export function ArrowRightIcon(props: IconProps) {
  return <Icon {...props}><path d="m14 6 6 6-6 6M20 12H4" /></Icon>;
}

export function PlayIcon(props: IconProps) {
  return <Icon {...props}><path d="m9 7 8 5-8 5Z" /></Icon>;
}

export function PauseIcon(props: IconProps) {
  return <Icon {...props}><path d="M9 7v10M15 7v10" /></Icon>;
}

export function SunIcon(props: IconProps) {
  return <Icon {...props}><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></Icon>;
}

export function MoonIcon(props: IconProps) {
  return <Icon {...props}><path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" /></Icon>;
}

export function SparkIcon(props: IconProps) {
  return <Icon {...props}><path d="M12 2c.45 5.25 4.75 9.55 10 10-5.25.45-9.55 4.75-10 10-.45-5.25-4.75-9.55-10-10 5.25-.45 9.55-4.75 10-10Z" /></Icon>;
}

export function CheckIcon(props: IconProps) {
  return <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
}

export function StarIcon(props: IconProps) {
  return <Icon {...props}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" /></Icon>;
}
