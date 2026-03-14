"use client"

import React from "react"
import { PageHero } from "@/components/page-hero"

export interface SimpleHeroSectionProps {
  /** Main heading text (one line) */
  title: string
  /** Subtitle/description text (one line) */
  subtitle: string
  /** Optional badge text */
  badge?: string
  /** @deprecated Use PageHero - gradient props kept for backwards compat, ignored */
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
}

export function SimpleHeroSection({
  title,
  subtitle,
  badge,
  gradientFrom,
  gradientVia,
  gradientTo,
}: SimpleHeroSectionProps) {
  return <PageHero badge={badge} title={title} subtitle={subtitle} />
}
