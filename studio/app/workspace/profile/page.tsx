"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Loader2,
  User,
  Mail,
  Lock,
  Save,
  Building2,
  Pencil,
  ShieldCheck,
  AlertCircle,
  Phone,
  Globe,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { DRAWER_WIDTH_HALF } from "@/lib/drawer-sizes";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

interface UserInfo {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  phone?: string;
  bio?: string;
  avatar_url?: string;
  timezone?: string;
  date_of_birth?: string | null;
  locale?: string;
}

interface CorporateInfo {
  company_name: string;
  job_title: string;
  phone: string;
  website: string;
  tax_id: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  notes: string;
}

const emptyCorporate: CorporateInfo = {
  company_name: "",
  job_title: "",
  phone: "",
  website: "",
  tax_id: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  notes: "",
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [corporateInfo, setCorporateInfo] = useState<CorporateInfo>(emptyCorporate);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingCorporate, setSavingCorporate] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerError, setDrawerError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [timezone, setTimezone] = useState("UTC");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [locale, setLocale] = useState("en-US");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [corporateError, setCorporateError] = useState<string | null>(null);

  const authHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) return null;
    return { Authorization: `Bearer ${token}` } as HeadersInit;
  };

  const ensureAuth = () => {
    const headers = authHeaders();
    if (!headers) {
      setProfileError("Not authenticated. Please log in.");
      setLoading(false);
    }
    return headers;
  };

  useEffect(() => {
    const headers = ensureAuth();
    if (!headers) return;
    const loadAll = async () => {
      try {
        await Promise.all([fetchUserInfo(headers), fetchCorporateInfo(headers)]);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  async function fetchUserInfo(headers: HeadersInit) {
    setProfileError(null);
    try {
      const response = await fetch(`${API_BASE}/api/user-info/`, { headers });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setProfileError("Session expired. Please log in again.");
          window.location.href = "/login";
          return;
        }
        throw new Error(`Failed to fetch user info (${response.status})`);
      }
      const data = await response.json();
      setUser(data);
      setEmail(data.email || "");
      setFirstName(data.first_name || "");
      setLastName(data.last_name || "");
      setPhone(data.phone || "");
      setBio(data.bio || "");
      setAvatarUrl(data.avatar_url || "");
      setAvatarPreview(null);
      setTimezone(data.timezone || "UTC");
      setDateOfBirth(data.date_of_birth || "");
      setLocale(data.locale || "en-US");
    } catch (error: any) {
      setProfileError(error.message || "Failed to load profile information");
    }
  }

  async function fetchCorporateInfo(headers: HeadersInit) {
    setCorporateError(null);
    try {
      const response = await fetch(`${API_BASE}/api/profile/corporate/`, { headers });
      if (response.ok) {
        const data = await response.json();
        setCorporateInfo({ ...emptyCorporate, ...data });
      } else if (response.status !== 404) {
        throw new Error(`Failed to load corporate info (${response.status})`);
      }
    } catch (error: any) {
      setCorporateError(error.message || "Unable to load corporate details");
    }
  }

  const openDrawer = () => {
    if (user) {
      setEmail(user.email || "");
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setPhone(user.phone || "");
      setBio(user.bio || "");
      setAvatarUrl(user.avatar_url || "");
      setAvatarPreview(null);
      setTimezone(user.timezone || "UTC");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setDrawerError(null);
      setPasswordError(null);
      setCorporateError(null);
    }
    setDrawerOpen(true);
  };

  async function handleSaveDrawer() {
    setDrawerError(null);
    const headers = authHeaders();
    if (!headers) {
      setDrawerError("Not authenticated.");
      return;
    }

    setSavingProfile(true);
    setSavingCorporate(true);
    try {
      await handleSaveProfile(headers);
      await handleSaveCorporateInfo(headers);
      if (oldPassword || newPassword || confirmPassword) {
        await handleChangePassword(headers);
      }
      const h = authHeaders();
      if (h) {
        await fetchUserInfo(h);
        await fetchCorporateInfo(h);
      }
      setDrawerOpen(false);
      toast.success("Profile updated");
    } catch (e) {
      setDrawerError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSavingProfile(false);
      setSavingCorporate(false);
      setChangingPassword(false);
    }
  }

  async function handleSaveProfile(headers: HeadersInit) {
    setProfileError(null);
    try {
      const body: Record<string, string> = {
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
        bio,
        timezone,
      };
      if (avatarUrl) body.avatar_url = avatarUrl;

      const response = await fetch(`${API_BASE}/api/profile/update/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (headers as Record<string, string>).Authorization,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || err.email?.[0] || `Failed to update profile (${response.status})`);
      }
    } catch (error: any) {
      setProfileError(error.message);
      throw error;
    }
  }

  async function handleSaveCorporateInfo(headers: HeadersInit) {
    setCorporateError(null);
    try {
      const response = await fetch(`${API_BASE}/api/profile/corporate/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: (headers as Record<string, string>).Authorization,
        },
        body: JSON.stringify(corporateInfo),
      });
      if (!response.ok && response.status !== 404) {
        throw new Error(`Failed to update corporate info (${response.status})`);
      }
    } catch (error: any) {
      setCorporateError(error.message);
      throw error;
    }
  }

  async function handleChangePassword(headers: HeadersInit) {
    if (!newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      throw new Error("Passwords do not match");
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      throw new Error("Password must be at least 8 characters");
    }
    setPasswordError(null);
    setChangingPassword(true);
    try {
      const response = await fetch(`${API_BASE}/api/profile/change-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (headers as Record<string, string>).Authorization,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || err.old_password?.[0] || "Failed to change password");
      }
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setPasswordError(error instanceof Error ? error.message : "Failed to change password");
      throw error;
    } finally {
      setChangingPassword(false);
    }
  }

  const displayName = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || user?.username || "User";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
        <p className="text-red-600">{profileError || "Failed to load profile"}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Avatar at top */}
      <div className="flex flex-col items-center pt-4 pb-8">
        <div className="relative">
          {(avatarPreview || user.avatar_url) ? (
            <img
              src={avatarPreview || user.avatar_url || ""}
              alt="Avatar"
              className="h-28 w-28 rounded-full object-cover border-4 border-background shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-muted border-4 border-background shadow-lg flex items-center justify-center">
              <User className="h-14 w-14 text-muted-foreground" />
            </div>
          )}
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">{displayName}</h1>
        <div className="mt-1 flex items-center gap-2">
          <Badge className="capitalize">{user.role}</Badge>
          {user.is_active && (
            <Badge variant="outline" className="text-green-600 border-green-200">
              <ShieldCheck className="h-3 w-3 mr-1" />
              Active
            </Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{user.email || "—"}</p>
        <Button onClick={openDrawer} variant="outline" className="mt-4" size="sm">
          <Pencil className="h-4 w-4 mr-2" />
          Edit profile
        </Button>
      </div>

      {/* Read-only summary — all fields from edit drawer */}
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Personal</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Username</dt>
                <dd className="font-medium">{user.username}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Email</dt>
                <dd className="font-medium">{user.email || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">First name</dt>
                <dd className="font-medium">{user.first_name || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Last name</dt>
                <dd className="font-medium">{user.last_name || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Phone</dt>
                <dd className="font-medium">{user.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Timezone</dt>
                <dd className="font-medium">{user.timezone || "UTC"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Avatar URL</dt>
                <dd className="font-medium truncate max-w-xs" title={user.avatar_url || ""}>{user.avatar_url || "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Bio</dt>
                <dd className="font-medium whitespace-pre-wrap">{user.bio || "—"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Corporate</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Company name</dt>
                <dd className="font-medium">{corporateInfo.company_name || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Title / Department</dt>
                <dd className="font-medium">{corporateInfo.job_title || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Phone</dt>
                <dd className="font-medium">{corporateInfo.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Website</dt>
                <dd className="font-medium truncate max-w-xs" title={corporateInfo.website || ""}>{corporateInfo.website || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Tax ID / VAT</dt>
                <dd className="font-medium">{corporateInfo.tax_id || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Country</dt>
                <dd className="font-medium">{corporateInfo.country || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Address line 1</dt>
                <dd className="font-medium">{corporateInfo.address_line1 || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Address line 2</dt>
                <dd className="font-medium">{corporateInfo.address_line2 || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">City</dt>
                <dd className="font-medium">{corporateInfo.city || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">State / Province</dt>
                <dd className="font-medium">{corporateInfo.state || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Postal code</dt>
                <dd className="font-medium">{corporateInfo.postal_code || "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Notes</dt>
                <dd className="font-medium whitespace-pre-wrap">{corporateInfo.notes || "—"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Portaled Edit drawer — asset-inventory style */}
      {drawerOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              aria-hidden
              onClick={() => setDrawerOpen(false)}
            />
            <aside
              className={`fixed right-0 w-full ${DRAWER_WIDTH_HALF} bg-background border-l shadow-xl z-50 flex flex-col`}
              style={{ top: 0, height: "100vh" }}
              aria-label="Edit profile"
            >
              <div className="flex shrink-0 items-center justify-between px-4 border-b" style={{ height: "64px" }}>
                <h2 className="text-lg font-semibold">Edit profile</h2>
                <button
                  type="button"
                  className="p-2 rounded-md hover:bg-muted"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 gap-4">
                  <section className="rounded-lg border bg-muted/30 p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <User className="h-4 w-4" /> Personal Information
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Username</label>
                        <Input value={user.username} disabled className="h-9 bg-muted" />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Email</label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="h-9" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">First name</label>
                          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-9" />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Last name</label>
                          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-9" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Phone</label>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="h-9" placeholder="+1 (555) 123-4567" />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Timezone</label>
                        <Select value={timezone} onValueChange={setTimezone}>
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 25 }, (_, i) => {
                              const offset = i - 12;
                              const sign = offset >= 0 ? "+" : "";
                              const label = offset === 0 ? "UTC (UTC+0)" : `UTC${sign}${offset}`;
                              const value = offset === 0 ? "UTC" : `UTC${sign}${offset}`;
                              return <SelectItem key={value} value={value}>{label}</SelectItem>;
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Avatar URL</label>
                        <Input
                          value={avatarUrl}
                          onChange={(e) => {
                            setAvatarUrl(e.target.value);
                            setAvatarPreview(e.target.value || null);
                          }}
                          placeholder="https://..."
                          className="h-9"
                        />
                        {(avatarPreview || user.avatar_url) && (
                          <img src={avatarPreview || user.avatar_url || ""} alt="Preview" className="mt-2 h-16 w-16 rounded-full object-cover border" onError={() => setAvatarPreview(null)} />
                        )}
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Bio</label>
                        <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." rows={3} className="text-sm" />
                      </div>
                    </div>
                  </section>

                  <section className="rounded-lg border bg-muted/30 p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Building2 className="h-4 w-4" /> Corporate Information
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Company name</label>
                          <Input value={corporateInfo.company_name} onChange={(e) => setCorporateInfo((c) => ({ ...c, company_name: e.target.value }))} className="h-9" />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Title / Department</label>
                          <Input value={corporateInfo.job_title} onChange={(e) => setCorporateInfo((c) => ({ ...c, job_title: e.target.value }))} className="h-9" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Phone</label>
                          <Input value={corporateInfo.phone} onChange={(e) => setCorporateInfo((c) => ({ ...c, phone: e.target.value }))} className="h-9" />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Website</label>
                          <Input value={corporateInfo.website} onChange={(e) => setCorporateInfo((c) => ({ ...c, website: e.target.value }))} className="h-9" placeholder="https://" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Address line 1</label>
                        <Input value={corporateInfo.address_line1} onChange={(e) => setCorporateInfo((c) => ({ ...c, address_line1: e.target.value }))} className="h-9" />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Address line 2</label>
                        <Input value={corporateInfo.address_line2} onChange={(e) => setCorporateInfo((c) => ({ ...c, address_line2: e.target.value }))} className="h-9" />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">City</label>
                          <Input value={corporateInfo.city} onChange={(e) => setCorporateInfo((c) => ({ ...c, city: e.target.value }))} className="h-9" />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">State</label>
                          <Input value={corporateInfo.state} onChange={(e) => setCorporateInfo((c) => ({ ...c, state: e.target.value }))} className="h-9" />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Postal code</label>
                          <Input value={corporateInfo.postal_code} onChange={(e) => setCorporateInfo((c) => ({ ...c, postal_code: e.target.value }))} className="h-9" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Country</label>
                        <Input value={corporateInfo.country} onChange={(e) => setCorporateInfo((c) => ({ ...c, country: e.target.value }))} className="h-9" />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Tax ID / VAT</label>
                        <Input value={corporateInfo.tax_id} onChange={(e) => setCorporateInfo((c) => ({ ...c, tax_id: e.target.value }))} className="h-9" />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Notes</label>
                        <Textarea value={corporateInfo.notes} onChange={(e) => setCorporateInfo((c) => ({ ...c, notes: e.target.value }))} rows={2} className="text-sm" />
                      </div>
                    </div>
                  </section>

                  <section className="rounded-lg border bg-muted/30 p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Lock className="h-4 w-4" /> Security
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Current password</label>
                        <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="h-9" placeholder="Required to change" />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">New password</label>
                        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-9" placeholder="Min 8 characters" />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Confirm new password</label>
                        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-9" />
                      </div>
                      {(passwordError || profileError || corporateError) && (
                        <p className="text-sm text-destructive">{passwordError || profileError || corporateError}</p>
                      )}
                    </div>
                  </section>
                </div>
                {drawerError && <p className="text-sm text-destructive mt-2">{drawerError}</p>}
                <div className="mt-6 flex gap-2">
                  <Button
                    size="sm"
                    className="bg-palette-accent-2 text-palette-primary hover:bg-palette-accent-3 border border-palette-accent-2"
                    onClick={handleSaveDrawer}
                    disabled={savingProfile || savingCorporate || changingPassword}
                  >
                    {(savingProfile || savingCorporate || changingPassword) ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setDrawerOpen(false)} disabled={savingProfile || savingCorporate || changingPassword}>
                    Cancel
                  </Button>
                </div>
              </div>
            </aside>
          </>,
          document.body
        )}
    </div>
  );
}
