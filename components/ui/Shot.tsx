import type { CSSProperties } from "react";
import type { Shot as ShotContent } from "@/content/products";

type ShotProps = {
  shot: ShotContent;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
};

function sourcesFor(shot: ShotContent, extension: "avif" | "webp") {
  if (shot.width < 800) return `${shot.base}-${shot.width}.${extension}`;
  return `${shot.base}-800.${extension} 800w, ${shot.base}-1440.${extension} 1440w`;
}

export function shotSizes(shot: ShotContent) {
  const maxDisplayWidth = shot.width / 2;
  return `(min-width: 768px) ${maxDisplayWidth}px, calc(100vw - 48px)`;
}

export function Shot({ shot, loading = "lazy", fetchPriority, className = "" }: ShotProps) {
  const maxDisplayWidth = shot.width / 2;
  const style = {
    "--shot-max": `${maxDisplayWidth}px`,
    aspectRatio: `${shot.width} / ${shot.height}`,
  } as CSSProperties;

  return (
    <div className={`shot w-full md:max-w-[var(--shot-max)] ${className}`} style={style}>
      <picture>
        <source type="image/avif" srcSet={sourcesFor(shot, "avif")} sizes={shotSizes(shot)} width={shot.width} height={shot.height} />
        <source type="image/webp" srcSet={sourcesFor(shot, "webp")} sizes={shotSizes(shot)} width={shot.width} height={shot.height} />
        <img
          src={`${shot.base}-${shot.width < 800 ? shot.width : 1440}.webp`}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
        />
      </picture>
    </div>
  );
}
