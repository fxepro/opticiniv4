"use client";

import React from "react";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "var(--rd-bg-page)", fontFamily: "var(--rd-font-body)" }}
    >
      {children}
    </div>
  );
}
