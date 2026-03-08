"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { applyTheme } from "@/lib/theme";
import { Role } from "@/lib/types/role";
import { Loader2, Save, X } from "lucide-react";
import axios from "axios";

// Use relative URL in production (browser), localhost in dev (SSR)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== 'undefined' ? '' : 'http://localhost:8000');

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  date_joined: string;
  last_login: string;
  profile?: { organization_id?: string | null };
}

interface Organization {
  id: string;
  name: string;
}

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
  currentUserIsSuperuser?: boolean;
}


export function EditUserModal({ user, isOpen, onClose, onSave, currentUserIsSuperuser }: EditUserModalProps) {
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    role_id: number | null;
    is_active: boolean;
    organization_id: string | null;
  }>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "viewer",
    role_id: null,
    is_active: true,
    organization_id: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [organizationsLoading, setOrganizationsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const orgId = user.profile?.organization_id ?? null;
      setFormData(prev => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        role: user.role || "viewer",
        role_id: null,
        is_active: user.is_active,
        organization_id: orgId != null ? String(orgId) : null,
      }));
      setError("");
    }
  }, [user]);

  useEffect(() => {
    if (user && roles.length > 0) {
      const roleName = (user.role || "viewer").toLowerCase();
      const match = roles.find(r => r.name.toLowerCase() === roleName);
      setFormData(prev => ({
        ...prev,
        role_id: match ? match.id : null,
      }));
    }
  }, [user, roles]);

  useEffect(() => {
    if (isOpen) {
      fetchRoles();
      if (currentUserIsSuperuser) fetchOrganizations();
    }
  }, [isOpen, currentUserIsSuperuser]);

  const fetchRoles = async () => {
    setRolesLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const response = await axios.get(`${API_BASE}/api/roles/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setRolesLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    setOrganizationsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const response = await axios.get(`${API_BASE}/api/users/organizations/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrganizations(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching organizations:", error);
      setOrganizations([]);
    } finally {
      setOrganizationsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const payload: Record<string, unknown> = {
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        is_active: formData.is_active,
      };
      if (formData.role_id != null) {
        payload.role_id = formData.role_id;
      } else {
        payload.role = formData.role;
      }
      if (currentUserIsSuperuser && 'organization_id' in formData) {
        payload.organization_id = formData.organization_id || null;
      }
      const response = await axios.put(
        `${API_BASE}/api/users/${user.id}/update/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onSave(response.data);
      onClose();
    } catch (error: any) {
      console.error("Error updating user:", error);
      setError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Failed to update user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const roleOptions = roles.map(role => ({
    value: role.id.toString(),
    label: role.name,
  }));

  const selectedRoleId = formData.role_id ?? roles.find(r => r.name.toLowerCase() === formData.role)?.id;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md ${applyTheme.card()}`}>
        <DialogHeader>
          <DialogTitle className={applyTheme.text('primary')}>
            Edit User
          </DialogTitle>
          <DialogDescription className={applyTheme.text('secondary')}>
            Update user information and permissions
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className={`p-3 rounded-md bg-red-50 border border-red-200 ${applyTheme.status('error')}`}>
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className={applyTheme.text('label')}>
              Username *
            </Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={applyTheme.text('label')}>
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name" className={applyTheme.text('label')}>
                First Name
              </Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name" className={applyTheme.text('label')}>
                Last Name
              </Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className={applyTheme.text('label')}>
              Role
            </Label>
            <Select
              value={selectedRoleId != null ? String(selectedRoleId) : ""}
              onValueChange={(value) => {
                const id = parseInt(value, 10);
                const r = roles.find(ro => ro.id === id);
                setFormData(prev => ({
                  ...prev,
                  role_id: id,
                  role: r ? r.name.toLowerCase() : prev.role,
                }));
              }}
            >
              <SelectTrigger className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {rolesLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading roles...
                  </SelectItem>
                ) : (
                  roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {currentUserIsSuperuser && (
            <div className="space-y-2">
              <Label htmlFor="organization" className={applyTheme.text('label')}>
                Organization
              </Label>
              <Select
                value={formData.organization_id ?? "__none__"}
                onValueChange={(value) => handleInputChange("organization_id", value === "__none__" ? null : value)}
              >
                <SelectTrigger className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
                  <SelectValue placeholder="No organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">
                    No organization
                  </SelectItem>
                  {organizationsLoading ? (
                    <SelectItem value="__loading__" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    organizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleInputChange("is_active", checked)}
            />
            <Label htmlFor="is_active" className={applyTheme.text('label')}>
              Active User
            </Label>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={applyTheme.button('secondary')}
              disabled={loading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              className={applyTheme.button('primary')}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
