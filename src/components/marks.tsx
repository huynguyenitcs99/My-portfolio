import Image from "next/image";

export function Nekomata({
  className = "",
  size = 64,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      className={`nekomata ${className}`}
      src="/images/brand/nekomata.png"
      alt="Huy's two-tailed Nekomata mark"
      width={size}
      height={Math.round((size * 1199) / 1312)}
      sizes={`${size}px`}
    />
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "↗"}
    </span>
  );
}

export function TwinPaths({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 540"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M60 380C-55 55 795-12 939 205C1100 450 326 611 81 342"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M945 337C1072 65 376-88 84 142C-120 305 602 628 931 342"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="60" cy="380" r="6" fill="currentColor" />
      <circle cx="945" cy="337" r="6" fill="currentColor" />
    </svg>
  );
}
