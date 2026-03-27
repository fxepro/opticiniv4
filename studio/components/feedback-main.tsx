"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Star, Send, Heart, ThumbsUp, AlertTriangle } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { PageLayout } from "@/components/page-layout"

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (typeof window !== "undefined" ? "" : "http://localhost:8000")

export default function FeedbackMain() {
  const { t } = useTranslation()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [greatWork, setGreatWork] = useState("")
  const [couldBeBetter, setCouldBeBetter] = useState("")
  const [removeAndRelish, setRemoveAndRelish] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: t("feedback.toastRatingTitle"),
        description: t("feedback.toastRatingDesc"),
        variant: "destructive",
      })
      return
    }

    if (!greatWork && !couldBeBetter && !removeAndRelish) {
      toast({
        title: t("feedback.toastFeedbackTitle"),
        description: t("feedback.toastFeedbackDesc"),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_BASE}/api/feedback/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          greatWork,
          couldBeBetter,
          removeAndRelish,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast({
          title: t("feedback.toastThanksTitle"),
          description: t("feedback.toastThanksDesc"),
        })

        setRating(0)
        setGreatWork("")
        setCouldBeBetter("")
        setRemoveAndRelish("")
      } else {
        throw new Error(result.error || "Failed to submit feedback")
      }
    } catch {
      toast({
        title: t("feedback.toastErrorTitle"),
        description: t("feedback.toastErrorDesc"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1
      const isFilled = starNumber <= (hoveredRating || rating)

      return (
        <button
          key={index}
          type="button"
          className="focus:outline-none focus:ring-2 focus:ring-[var(--rd-blue-600)] focus:ring-offset-2 rounded-full p-1"
          onClick={() => setRating(starNumber)}
          onMouseEnter={() => setHoveredRating(starNumber)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          <Star
            className={`h-12 w-12 transition-all duration-200 ${
              isFilled
                ? "text-[var(--rd-blue-600)] fill-current"
                : "text-gray-300 hover:text-[var(--rd-blue-400)]"
            }`}
          />
        </button>
      )
    })
  }

  const getRatingText = () => {
    if (rating === 0) return t("feedback.rating0")
    const key = `feedback.rating${rating}` as const
    return t(key)
  }

  return (
    <PageLayout>
      <PageHero
        badge={t("feedback.heroBadge")}
        title={t("feedback.heroTitle")}
        subtitle={t("feedback.heroSubtitle")}
      />

      <div className="container mx-auto px-4 pt-16 pb-16 max-w-3xl">
        <div className="mt-12 bg-white border-[1.5px] rounded-[18px] shadow-lg overflow-hidden" style={{ borderColor: "var(--rd-border-light)" }}>
          <div className="text-center pb-8 pt-12 px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
              {t("feedback.experienceTitle")}
            </h2>
            <p className="text-lg" style={{ color: "var(--rd-text-secondary)" }}>
              {t("feedback.experienceSubtitle")}
            </p>
          </div>

          <div className="px-6 pb-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="text-center">
                <div className="flex justify-center items-center space-x-2 mb-4">
                  {renderStars()}
                </div>
                <p className="text-xl font-semibold" style={{ color: "var(--rd-text-secondary)" }}>
                  {getRatingText()}
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <ThumbsUp className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                      {t("feedback.greatTitle")}
                    </h3>
                  </div>
                  <Textarea
                    placeholder={t("feedback.greatPlaceholder")}
                    value={greatWork}
                    onChange={(e) => setGreatWork(e.target.value)}
                    className="min-h-[100px] resize-none rounded-lg border-[1.5px] focus:border-[var(--rd-blue-600)] focus:ring-[var(--rd-blue-600)]"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                      {t("feedback.betterTitle")}
                    </h3>
                  </div>
                  <Textarea
                    placeholder={t("feedback.betterPlaceholder")}
                    value={couldBeBetter}
                    onChange={(e) => setCouldBeBetter(e.target.value)}
                    className="min-h-[100px] resize-none rounded-lg border-[1.5px] focus:border-[var(--rd-blue-600)] focus:ring-[var(--rd-blue-600)]"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                      {t("feedback.removeTitle")}
                    </h3>
                  </div>
                  <Textarea
                    placeholder={t("feedback.removePlaceholder")}
                    value={removeAndRelish}
                    onChange={(e) => setRemoveAndRelish(e.target.value)}
                    className="min-h-[100px] resize-none rounded-lg border-[1.5px] focus:border-[var(--rd-blue-600)] focus:ring-[var(--rd-blue-600)]"
                  />
                </div>
              </div>

              <div className="text-center pt-6 pb-12">
                <Button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "var(--rd-blue-600)", color: "#fff" }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block align-middle" />
                      {t("feedback.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2 inline" />
                      {t("feedback.submit")}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
