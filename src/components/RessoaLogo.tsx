// Símbolo da Ressoa: o megafone, a voz que chega a todas as redes.
// O corpo é Âmbar; o contorno, o punho e as ondas usam a cor do texto (currentColor).
export function RessoaSymbol({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 40 L54 22 V78 L14 60 Z" fill="var(--color-amber-400)" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <rect x="8" y="38" width="12" height="24" rx="2" fill="currentColor" />
      <path d="M24 62 L30 84 H40 L36 66" fill="currentColor" strokeLinejoin="round" />
      <path d="M66 34 L80 24 M68 50 H88 M66 66 L80 76" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}
