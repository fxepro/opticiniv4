"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, Send, Heart, ThumbsUp, AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PageLayout } from "@/components/page-layout";

// Use relative URL in production (browser), localhost in dev (SSR)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== 'undefined' ? '' : 'http://localhost:8000');

export default function FeedbackMain() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [greatWork, setGreatWork] = useState("");
  const [couldBeBetter, setCouldBeBetter] = useState("");
  const [removeAndRelish, setRemoveAndRelish] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting feedback.",
        variant: "destructive",
      });
      return;
    }

    if (!greatWork && !couldBeBetter && !removeAndRelish) {
      toast({
        title: "Feedback Required",
        description: "Please provide at least one piece of feedback.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to Django backend
      const response = await fetch(`${API_BASE}/api/feedback/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          greatWork,
          couldBeBetter,
          removeAndRelish
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "Thank You!",
          description: "Your feedback has been submitted successfully. We appreciate your input!",
        });

        // Reset form
        setRating(0);
        setGreatWork("");
        setCouldBeBetter("");
        setRemoveAndRelish("");
      } else {
        throw new Error(result.error || 'Failed to submit feedback');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isFilled = starNumber <= (hoveredRating || rating);
      
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
      );
    });
  };

  const getRatingText = () => {
    if (rating === 0) return "Rate your experience";
    if (rating === 1) return "Poor";
    if (rating === 2) return "Fair";
    if (rating === 3) return "Good";
    if (rating === 4) return "Very Good";
    if (rating === 5) return "Excellent";
    return "";
  };

  return (
    <PageLayout>
      <PageHero
        badge="We value your input"
        title="Share Your Feedback"
        subtitle="Help us improve Opticini by sharing your thoughts, suggestions, and experiences"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 pb-16 max-w-3xl">
        <div className="mt-12 bg-white border-[1.5px] rounded-[18px] shadow-lg overflow-hidden" style={{ borderColor: "var(--rd-border-light)" }}>
          <div className="text-center pb-8 pt-12 px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
              How was your experience?
            </h2>
            <p className="text-lg" style={{ color: "var(--rd-text-secondary)" }}>
              Your feedback helps us make Opticini better for everyone
            </p>
          </div>

          <div className="px-6 pb-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Star Rating */}
              <div className="text-center">
                <div className="flex justify-center items-center space-x-2 mb-4">
                  {renderStars()}
                </div>
                <p className="text-xl font-semibold" style={{ color: "var(--rd-text-secondary)" }}>
                  {getRatingText()}
                </p>
              </div>

              {/* Feedback Sections */}
              <div className="space-y-6">
                {/* Great Work */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <ThumbsUp className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                      What did we do great?
                    </h3>
                  </div>
                  <Textarea
                    placeholder="Tell us what you loved about Opticini. What features worked well? What exceeded your expectations?"
                    value={greatWork}
                    onChange={(e) => setGreatWork(e.target.value)}
                    className="min-h-[100px] resize-none rounded-lg border-[1.5px] focus:border-[var(--rd-blue-600)] focus:ring-[var(--rd-blue-600)]"
                  />
                </div>

                {/* Could Be Better */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                      What could be better?
                    </h3>
                  </div>
                  <Textarea
                    placeholder="Share suggestions for improvement. What features need work? What would make your experience smoother?"
                    value={couldBeBetter}
                    onChange={(e) => setCouldBeBetter(e.target.value)}
                    className="min-h-[100px] resize-none rounded-lg border-[1.5px] focus:border-[var(--rd-blue-600)] focus:ring-[var(--rd-blue-600)]"
                  />
                </div>

                {/* Remove and Relish */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                      What should we remove and relish?
                    </h3>
                  </div>
                  <Textarea
                    placeholder="What features are frustrating or unnecessary? What should we completely remove or redesign?"
                    value={removeAndRelish}
                    onChange={(e) => setRemoveAndRelish(e.target.value)}
                    className="min-h-[100px] resize-none rounded-lg border-[1.5px] focus:border-[var(--rd-blue-600)] focus:ring-[var(--rd-blue-600)]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6 pb-12">
                <Button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "var(--rd-blue-600)", color: "#fff" }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
