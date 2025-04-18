import React from 'react';

interface IconProps {
  className?: string;
}

export const SeedIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path d="M12 22.5c-5.523 0-10-4.477-10-10 0-4.478 2.943-8.268 7-9.542v2.127A8.003 8.003 0 004 12.5c0 4.418 3.582 8 8 8s8-3.582 8-8a8.003 8.003 0 00-5-7.415V4.958c4.057 1.274 7 5.064 7 9.542 0 5.523-4.477 10-10 10z" />
  </svg>
);

export const SproutIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L9.1 7.4 3 8.5l4.5 4.1L6.5 19 12 16l5.5 3-1-6.4L21 8.5l-6.1-1.1z" />
  </svg>
);

export const GrowthIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="12" y1="2" x2="16" y2="6" />
    <line x1="12" y1="2" x2="8" y2="6" />
    <line x1="12" y1="22" x2="16" y2="18" />
    <line x1="12" y1="22" x2="8" y2="18" />
    <line x1="5" y1="12" x2="19" y2="12" />
    <line x1="19" y1="12" x2="15" y2="16" />
    <line x1="19" y1="12" x2="15" y2="8" />
    <line x1="5" y1="12" x2="9" y2="16" />
    <line x1="5" y1="12" x2="9" y2="8" />
  </svg>
);


export const FlowerIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2c-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.72V7h-1c-.34-.6-.98-1-1.72-1-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.72V11h-1c-.34-.6-.98-1-1.72-1C3.9 10 3 10.9 3 12s.9 2 2 2c.74 0 1.38-.4 1.72-1H8v1.28c-.6.34-1 .98-1 1.72 0 1.1.9 2 2 2 .74 0 1.38-.4 1.72-1H12v1.28c-.6.34-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V17h1.28c.34.6.98 1 1.72 1 1.1 0 2-.9 2-2 0-.74-.4-1.38-1-1.72V13h1.28c.34.6.98 1 1.72 1 1.1 0 2-.9 2-2s-.9-2-2-2c-.74 0-1.38.4-1.72 1H16v-1.28c.6-.34 1-.98 1-1.72 0-1.1-.9-2-2-2-.74 0-1.38.4-1.72 1H12V6.72c.6-.34 1-.98 1-1.72 0-1.1-.9-2-2-2zm0 6c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" />
  </svg>
);

export const FruitIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a9 9 0 00-9 9c0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11a9 9 0 00-9-9zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
  </svg>
);

export const HarvestIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </svg>
);