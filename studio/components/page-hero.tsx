"use client";

import React from "react";

export interface PageHeroProps {
  /** Optional badge text (e.g. "Resources", "Plans") */
  badge?: string;
  /** Main heading */
  title: string;
  /** Subtitle/description */
  subtitle: string;
}

export function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative py-20 px-4 sm:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, var(--rd-bg-blue-wash) 0%, var(--rd-bg-white) 55%, var(--rd-blue-50) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(var(--rd-border-blue) 1px, transparent 1px), linear-gradient(90deg, var(--rd-border-blue) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,.06) 0%, transparent 68%)" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {badge && (
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border mb-6"
            style={{
              borderColor: "var(--rd-blue-200)",
              background: "var(--rd-blue-50)",
              color: "var(--rd-blue-600)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: ".09em",
              textTransform: "uppercase",
            }}
          >
            <span className="w-[7px] h-[7px] rounded-full bg-[var(--rd-blue-500)] animate-pulse" />
            {badge}
          </div>
        )}
        <h1
          className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-tight mb-4"
          style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}
        >
          {title}
        </h1>
        <p
          className="text-[clamp(17px,2vw,20px)] font-medium max-w-2xl mx-auto"
          style={{ color: "var(--rd-text-secondary)" }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
