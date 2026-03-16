"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Building, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";

// Use relative URL in production (browser), localhost in dev (SSR)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== 'undefined' ? '' : 'http://localhost:8000');

export default function RequestDemoPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    useCase: "",
    message: ""
  });

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setLoggedIn(true);
      // Fetch user info
      axios.get(`${API_BASE}/api/user-info/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          setUser(res.data);
          // Pre-fill form with user data
          setFormData(prev => ({
            ...prev,
            name: `${res.data.first_name || ''} ${res.data.last_name || ''}`.trim() || res.data.username || '',
            email: res.data.email || '',
          }));
        })
        .catch(() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setLoggedIn(false);
        });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/api/demo-request/`, {
        ...formData,
        user_id: user?.id || null,
        username: user?.username || null,
      });

      if (response.data.success) {
        setSubmitted(true);
      } else {
        setError(response.data.error || "Failed to submit demo request. Please try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to submit demo request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--rd-bg-page)", fontFamily: "var(--rd-font-body)" }}>
        <Card className="w-full max-w-md shadow-lg rounded-[18px] border-[1.5px]" style={{ borderColor: "var(--rd-border-light)" }}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full p-3" style={{ background: "var(--rd-blue-100)" }}>
                <CheckCircle className="h-12 w-12" style={{ color: "var(--rd-emerald-600)" }} />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>Demo Request Submitted!</CardTitle>
            <CardDescription style={{ color: "var(--rd-text-secondary)" }}>
              Thank you for your interest. We'll review your request and get back to you soon.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl" style={{ background: "var(--rd-bg-subtle)" }}>
              <p className="text-sm mb-2 font-semibold" style={{ color: "var(--rd-text-heading)" }}>
                What happens next?
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: "var(--rd-text-secondary)" }}>
                <li>Our team will review your demo request</li>
                <li>We'll contact you within 24-48 hours</li>
                <li>You'll get access to a demo account with sample data</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => router.push("/")}
                className="w-full"
              >
                Return to Homepage
              </Button>
              {loggedIn && (
                <Button
                  variant="outline"
                  onClick={() => router.push("/workspace")}
                  className="w-full"
                >
                  Go to Workspace
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--rd-bg-page)", fontFamily: "var(--rd-font-body)" }}>
      <PageHero
        badge="Request Demo"
        title="Experience Opticini with Demo Data"
        subtitle="Get access to a demo account with pre-loaded sample data to explore all features and capabilities of Opticini."
      />
      <div className="container mx-auto px-4 pt-16 pb-16 max-w-6xl">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 mt-12">
          <div
            className="rounded-[18px] border-[1.5px] p-6 text-center transition-colors hover:border-[#93c5fd]"
            style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}
          >
            <Building className="h-8 w-8 mx-auto mb-3" style={{ color: "var(--rd-blue-600)" }} />
            <h3 className="font-semibold mb-2" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>Sample Data</h3>
            <p className="text-sm" style={{ color: "var(--rd-text-secondary)" }}>
              Explore real monitoring data, reports, and analytics from sample websites
            </p>
          </div>
          <div
            className="rounded-[18px] border-[1.5px] p-6 text-center transition-colors hover:border-[#93c5fd]"
            style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}
          >
            <User className="h-8 w-8 mx-auto mb-3" style={{ color: "var(--rd-blue-600)" }} />
            <h3 className="font-semibold mb-2" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>Full Access</h3>
            <p className="text-sm" style={{ color: "var(--rd-text-secondary)" }}>
              Access all features including AI analysis, monitoring, and reporting tools
            </p>
          </div>
          <div
            className="rounded-[18px] border-[1.5px] p-6 text-center transition-colors hover:border-[#93c5fd]"
            style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}
          >
            <MessageSquare className="h-8 w-8 mx-auto mb-3" style={{ color: "var(--rd-blue-600)" }} />
            <h3 className="font-semibold mb-2" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>Expert Support</h3>
            <p className="text-sm" style={{ color: "var(--rd-text-secondary)" }}>
              Get guidance from our team to help you make the most of your demo
            </p>
          </div>
        </div>

        {/* Demo Request Form */}
        <Card className="shadow-lg rounded-[18px] border-[1.5px]" style={{ borderColor: "var(--rd-border-light)" }}>
          <CardHeader>
            <CardTitle>Request Demo Account</CardTitle>
            <CardDescription>
              {loggedIn 
                ? `Signed in as ${user?.username || user?.email}. We'll use your account details.`
                : "Sign in to pre-fill your information, or fill out the form manually."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="px-4 py-3 rounded-xl flex items-center gap-2" style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" }}>
                  <AlertCircle className="h-5 w-5" />
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company / Organization</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={handleChange}
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleSelectChange("role", value)}
                    required
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CTO">CTO / Technical Director</SelectItem>
                      <SelectItem value="Engineering Manager">Engineering Manager</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="DevOps">DevOps Engineer</SelectItem>
                      <SelectItem value="Product Manager">Product Manager</SelectItem>
                      <SelectItem value="Marketing">Marketing Manager</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">Primary Use Case *</Label>
                <Select
                  value={formData.useCase}
                  onValueChange={(value) => handleSelectChange("useCase", value)}
                  required
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="What do you want to use Opticini for?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website Monitoring">Website Monitoring</SelectItem>
                    <SelectItem value="Performance Analysis">Performance Analysis</SelectItem>
                    <SelectItem value="Security Auditing">Security Auditing</SelectItem>
                    <SelectItem value="SEO Monitoring">SEO Monitoring</SelectItem>
                    <SelectItem value="API Monitoring">API Monitoring</SelectItem>
                    <SelectItem value="Multi-site Management">Multi-site Management</SelectItem>
                    <SelectItem value="Team Collaboration">Team Collaboration</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your needs, timeline, or any specific features you'd like to explore..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                style={{ background: "var(--rd-blue-600)", color: "white" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Demo Request
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

