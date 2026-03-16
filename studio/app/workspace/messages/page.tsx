"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Inbox,
  Search,
  Loader2,
  Mail,
  User,
  Building2,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { applyTheme } from "@/lib/theme";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (typeof window !== "undefined" ? "" : "http://localhost:8000");

interface EmailCapture {
  id: number;
  email: string;
  form_type: string;
  form_type_display: string;
  metadata: Record<string, unknown>;
  created_at: string | null;
}

const FORM_TYPE_LABELS: Record<string, string> = {
  contact: "Contact",
  consultation: "Consultation",
  demo_request: "Demo Request",
  feedback: "Feedback",
  update_signup: "Update Signup",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<EmailCapture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formTypeFilter, setFormTypeFilter] = useState<string>("all");

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please log in to view messages");
        setLoading(false);
        return;
      }

      const params = new URLSearchParams();
      if (formTypeFilter !== "all") params.append("form_type", formTypeFilter);
      if (searchTerm) params.append("search", searchTerm);

      const url = `${API_BASE}/api/admin/email-captures/${
        params.toString() ? "?" + params.toString() : ""
      }`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
          return;
        }
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load messages";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchMessages, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, formTypeFilter]);

  const getFormTypeBadgeColor = (formType: string) => {
    switch (formType) {
      case "contact":
        return "bg-blue-100 text-blue-800";
      case "consultation":
        return "bg-purple-100 text-purple-800";
      case "demo_request":
        return "bg-green-100 text-green-800";
      case "feedback":
        return "bg-amber-100 text-amber-800";
      case "update_signup":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading && messages.length === 0) {
    return (
      <div className={applyTheme.page()}>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-palette-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Messages</h1>
        <p className="text-muted-foreground mt-1">
          View contact, consultation, demo requests, and other form submissions
        </p>
      </div>

      {/* Filters */}
      <Card className={applyTheme.card()}>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={formTypeFilter} onValueChange={setFormTypeFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Form type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="contact">Contact</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="demo_request">Demo Request</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="update_signup">Update Signup</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Message list */}
      <div className="space-y-4">
        {messages.map((msg) => {
          const meta = msg.metadata || {};
          const name = (meta.name as string) || "";
          const company = (meta.company as string) || "";
          const message = (meta.message as string) || "";
          const service = (meta.service as string) || "";
          const phone = (meta.phone as string) || "";

          return (
            <Card key={msg.id} className={applyTheme.card()}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFormTypeBadgeColor(msg.form_type)}`}
                      >
                        {msg.form_type_display || FORM_TYPE_LABELS[msg.form_type] || msg.form_type}
                      </span>
                      {service && (
                        <span className="text-xs text-slate-500">
                          {service}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {msg.created_at
                          ? new Date(msg.created_at).toLocaleString()
                          : "—"}
                      </span>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>
                      {name && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-slate-400 shrink-0" />
                          <span className={applyTheme.text("primary")}>
                            {name}
                          </span>
                        </div>
                      )}
                      {company && (
                        <div className="flex items-center gap-2 text-sm sm:col-span-2">
                          <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                          <span className={applyTheme.text("secondary")}>
                            {company}
                          </span>
                        </div>
                      )}
                      {phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className={applyTheme.text("secondary")}>
                            {phone}
                          </span>
                        </div>
                      )}
                    </div>

                    {message && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-start gap-2 text-sm">
                          <MessageSquare className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                          <p
                            className={`whitespace-pre-wrap ${applyTheme.text("secondary")}`}
                          >
                            {message}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Other metadata keys (subject, role, vertical, etc.) */}
                    {Object.keys(meta).some(
                      (k) =>
                        !["name", "company", "message", "service", "phone"].includes(k) &&
                        meta[k]
                    ) && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(meta).map(
                          ([key, val]) =>
                            !["name", "company", "message", "service", "phone"].includes(key) &&
                            val != null &&
                            String(val).trim() !== "" && (
                              <span
                                key={key}
                                className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600"
                              >
                                {key}: {String(val)}
                              </span>
                            )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!loading && messages.length === 0 && (
        <Card className="bg-white border-slate-200">
          <CardContent className="p-12 text-center">
            <Inbox className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-h4-dynamic font-semibold text-slate-800 mb-2">
              No messages found
            </h3>
            <p className="text-slate-500">
              Form submissions will appear here. Try adjusting your filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
