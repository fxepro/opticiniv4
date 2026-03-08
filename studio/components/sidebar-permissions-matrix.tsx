"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, RefreshCw, Loader2, ChevronDown, ChevronRight } from "lucide-react";
import { applyTheme } from "@/lib/theme";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

// Use relative URL in production (browser), localhost in dev (SSR)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== 'undefined' ? 'http://localhost:8000' : 'http://localhost:8000');

interface Role {
  id: number;
  name: string;
  is_system_role: boolean;
}

interface SidebarItem {
  id: string;
  title: string;
  section: string;
  section_title: string;
  required_permissions: Record<string, string>;
  href: string;
  role_access: Record<string, {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    display: string;
  }>;
}

interface MatrixData {
  roles: Role[];
  sidebar_items: SidebarItem[];
  summary: {
    total_items: number;
    role_counts: Record<string, number>;
  };
}

export function SidebarPermissionsMatrix() {
  const { toast } = useToast();
  const [matrixData, setMatrixData] = useState<MatrixData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [changes, setChanges] = useState<Record<string, Record<string, string[]>>>({}); // role_id -> sidebar_item_id -> permission_codes
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchMatrix();
  }, []);

  // Warn when leaving with unsaved changes (e.g. logout, refresh, navigate away)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges()) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [changes]);

  // Accordion starts closed; user expands sections as needed

  const fetchMatrix = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }

      const response = await axios.get(`${API_BASE}/api/roles/sidebar-matrix/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMatrixData(response.data);
      setChanges({});
    } catch (error: any) {
      console.error("Error fetching matrix:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setError("Session expired. Please log in again.");
        window.location.href = "/workspace/login";
      } else {
        setError(error.response?.data?.error || "Failed to fetch matrix data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (roleId: number, sidebarItemId: string, permissionType: string, granted: boolean) => {
    if (!matrixData) return;

    // All roles (system and custom) can have their permissions edited
    // System roles just can't be renamed or deleted, but permissions are editable

    const sidebarItem = matrixData.sidebar_items.find(item => item.id === sidebarItemId);
    if (!sidebarItem) return;

    const permissionCode = sidebarItem.required_permissions[permissionType];
    if (!permissionCode) return;

    setChanges(prev => {
      const newChanges = { ...prev };
      const roleKey = roleId.toString();
      const itemKey = sidebarItemId;

      if (!newChanges[roleKey]) {
        newChanges[roleKey] = {};
      }
      if (!newChanges[roleKey][itemKey]) {
        // Initialize with current permissions
        const currentAccess = sidebarItem.role_access[roleKey] || { view: false, create: false, edit: false, delete: false };
        const currentPerms: string[] = [];
        if (currentAccess.view && sidebarItem.required_permissions.view) currentPerms.push(sidebarItem.required_permissions.view);
        if (currentAccess.create && sidebarItem.required_permissions.create) currentPerms.push(sidebarItem.required_permissions.create);
        if (currentAccess.edit && sidebarItem.required_permissions.edit) currentPerms.push(sidebarItem.required_permissions.edit);
        if (currentAccess.delete && sidebarItem.required_permissions.delete) currentPerms.push(sidebarItem.required_permissions.delete);
        newChanges[roleKey][itemKey] = [...currentPerms];
      }

      const perms = newChanges[roleKey][itemKey];
      if (granted) {
        if (!perms.includes(permissionCode)) {
          newChanges[roleKey][itemKey] = [...perms, permissionCode];
        }
      } else {
        newChanges[roleKey][itemKey] = perms.filter(p => p !== permissionCode);
      }

      return newChanges;
    });
  };

  const getAccessValue = (roleId: number, sidebarItemId: string): string => {
    if (!matrixData) return "-";
    
    const roleKey = roleId.toString();
    const sidebarItem = matrixData.sidebar_items.find(item => item.id === sidebarItemId);
    if (!sidebarItem) return "-";

    // Check if there are pending changes
    const roleChanges = changes[roleKey];
    if (roleChanges && roleChanges[sidebarItemId]) {
      const changedPerms = roleChanges[sidebarItemId];
      const parts: string[] = [];
      if (sidebarItem.required_permissions.view && changedPerms.includes(sidebarItem.required_permissions.view)) parts.push('V');
      if (sidebarItem.required_permissions.create && changedPerms.includes(sidebarItem.required_permissions.create)) parts.push('C');
      if (sidebarItem.required_permissions.edit && changedPerms.includes(sidebarItem.required_permissions.edit)) parts.push('E');
      if (sidebarItem.required_permissions.delete && changedPerms.includes(sidebarItem.required_permissions.delete)) parts.push('D');
      return parts.length > 0 ? parts.join('+') : '-';
    }

    // Return current access
    const access = sidebarItem.role_access[roleKey];
    return access?.display || "-";
  };

  const getPermissionChecked = (roleId: number, sidebarItemId: string, permissionType: string): boolean => {
    if (!matrixData) return false;
    
    const roleKey = roleId.toString();
    const sidebarItem = matrixData.sidebar_items.find(item => item.id === sidebarItemId);
    if (!sidebarItem) return false;

    const permissionCode = sidebarItem.required_permissions[permissionType];
    if (!permissionCode) return false;

    // Check if there are pending changes
    const roleChanges = changes[roleKey];
    if (roleChanges && roleChanges[sidebarItemId]) {
      return roleChanges[sidebarItemId].includes(permissionCode);
    }

    // Return current access
    const access = sidebarItem.role_access[roleKey];
    if (!access) return false;

    const permissionValue = access[permissionType as keyof typeof access];
    return typeof permissionValue === 'boolean' ? permissionValue : false;
  };

  /** True if role has at least one permission (V/C/E/D) for this item (including pending changes). */
  const hasItemAnyPermission = (roleId: number, item: SidebarItem): boolean => {
    const types: Array<'view' | 'create' | 'edit' | 'delete'> = ['view', 'create', 'edit', 'delete'];
    return types.some(
      (t) => item.required_permissions[t] && getPermissionChecked(roleId, item.id, t)
    );
  };

  /** Module (section) checkbox: checked when at least one sub-module has any permission for this role. */
  const getModuleChecked = (roleId: number, sectionId: string): boolean => {
    if (!matrixData) return false;
    const items = matrixData.sidebar_items.filter((i) => i.section === sectionId);
    return items.some((item) => hasItemAnyPermission(roleId, item));
  };

  /** Module indeterminate when some but not all sub-modules have access. */
  const getModuleIndeterminate = (roleId: number, sectionId: string): boolean => {
    if (!matrixData) return false;
    const items = matrixData.sidebar_items.filter((i) => i.section === sectionId);
    if (items.length === 0) return false;
    const withAccess = items.filter((item) => hasItemAnyPermission(roleId, item));
    return withAccess.length > 0 && withAccess.length < items.length;
  };

  /** Set all sub-modules in section for this role to all permissions (grant=true) or none (grant=false). */
  const handleModuleChange = (roleId: number, sectionId: string, grant: boolean) => {
    if (!matrixData) return;
    const items = matrixData.sidebar_items.filter((i) => i.section === sectionId);
    const roleKey = roleId.toString();

    setChanges((prev) => {
      const newChanges = { ...prev };
      if (!newChanges[roleKey]) newChanges[roleKey] = {};

      items.forEach((item) => {
        if (grant) {
          const permCodes: string[] = [];
          if (item.required_permissions.view) permCodes.push(item.required_permissions.view);
          if (item.required_permissions.create) permCodes.push(item.required_permissions.create);
          if (item.required_permissions.edit) permCodes.push(item.required_permissions.edit);
          if (item.required_permissions.delete) permCodes.push(item.required_permissions.delete);
          newChanges[roleKey][item.id] = permCodes;
        } else {
          newChanges[roleKey][item.id] = [];
        }
      });
      return newChanges;
    });
  };

  const hasChanges = () => {
    return Object.keys(changes).length > 0;
  };

  const saveChanges = async () => {
    if (!matrixData || !hasChanges()) return;
    if (!confirm("Save these permission changes? They will apply after users refresh or log in again.")) return;

    try {
      setSaving(true);
      setError(null);
      let token = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      
      if (!token) {
        setError("Authentication token not found.");
        setSaving(false);
        return;
      }

      // Helper function to refresh token
      const refreshAccessToken = async (): Promise<string | null> => {
        if (!refreshToken) {
          return null;
        }
        
        try {
          const res = await axios.post(`${API_BASE}/api/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccessToken = res.data.access;
          localStorage.setItem("access_token", newAccessToken);
          // Update refresh token if a new one is provided (token rotation)
          if (res.data.refresh) {
            localStorage.setItem("refresh_token", res.data.refresh);
          }
          return newAccessToken;
        } catch (err) {
          console.error("Token refresh failed:", err);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          return null;
        }
      };

      // Helper function to make authenticated request with retry on 401
      const makeRequest = async (roleId: number, permCodes: string[], currentToken: string): Promise<void> => {
        try {
          await axios.post(
            `${API_BASE}/api/roles/sidebar-matrix/update/`,
            {
              role_id: roleId,
              permission_codes: permCodes,
            },
            {
              headers: { Authorization: `Bearer ${currentToken}` },
            }
          );
        } catch (err: any) {
          // If 401, try to refresh token and retry
          if (err.response?.status === 401) {
            const newToken = await refreshAccessToken();
            if (newToken) {
              // Retry with new token
              await axios.post(
                `${API_BASE}/api/roles/sidebar-matrix/update/`,
                {
                  role_id: roleId,
                  permission_codes: permCodes,
                },
                {
                  headers: { Authorization: `Bearer ${newToken}` },
                }
              );
              // Update token for subsequent requests
              token = newToken;
            } else {
              throw new Error("Session expired. Please log in again.");
            }
          } else {
            throw err;
          }
        }
      };

      // Collect all permission codes for each role
      const rolePermissionMap: Record<number, Set<string>> = {};

      // Start with current permissions from ALL sidebar items
      // This ensures we have the complete permission set before applying changes
      matrixData.roles.forEach(role => {
        rolePermissionMap[role.id] = new Set();
        matrixData.sidebar_items.forEach(item => {
          const access = item.role_access[role.id.toString()];
          if (access) {
            if (access.view && item.required_permissions.view) rolePermissionMap[role.id].add(item.required_permissions.view);
            if (access.create && item.required_permissions.create) rolePermissionMap[role.id].add(item.required_permissions.create);
            if (access.edit && item.required_permissions.edit) rolePermissionMap[role.id].add(item.required_permissions.edit);
            if (access.delete && item.required_permissions.delete) rolePermissionMap[role.id].add(item.required_permissions.delete);
          }
        });
      });

      // Apply changes - only modify permissions for items that were actually changed
      // The key fix: only remove/add permissions for the specific item being changed,
      // not all permissions that might be shared across items
      Object.entries(changes).forEach(([roleIdStr, itemChanges]) => {
        const roleId = parseInt(roleIdStr);
        if (!rolePermissionMap[roleId]) rolePermissionMap[roleId] = new Set();

        Object.entries(itemChanges).forEach(([itemId, permCodes]) => {
          const item = matrixData.sidebar_items.find(i => i.id === itemId);
          if (!item) return;

          // Get all permission codes that this specific item can have
          const itemPermissionCodes = new Set<string>();
          if (item.required_permissions.view) itemPermissionCodes.add(item.required_permissions.view);
          if (item.required_permissions.create) itemPermissionCodes.add(item.required_permissions.create);
          if (item.required_permissions.edit) itemPermissionCodes.add(item.required_permissions.edit);
          if (item.required_permissions.delete) itemPermissionCodes.add(item.required_permissions.delete);

          // Remove ONLY this item's permissions (this is safe because each item has unique permission codes)
          // e.g., site_audit.view vs reports.view are different codes, so removing one won't affect the other
          itemPermissionCodes.forEach(code => rolePermissionMap[roleId].delete(code));

          // Add back the permissions that should be active for this item
          // permCodes contains the final state of permissions for this item after changes
          permCodes.forEach(code => {
            // Safety check: only add if it's actually a permission code for this item
            if (itemPermissionCodes.has(code)) {
              rolePermissionMap[roleId].add(code);
            }
          });
        });
      });

      // Save each role (both system and custom roles can have permissions updated)
      const savePromises = Object.entries(rolePermissionMap).map(async ([roleIdStr, permCodes]) => {
        const roleId = parseInt(roleIdStr);
        await makeRequest(roleId, Array.from(permCodes), token!);
      });

      await Promise.all(savePromises);

      // Refresh matrix data
      await fetchMatrix();
      toast({
        title: "Permissions saved",
        description: "Role permission changes have been persisted. They will apply after users refresh or log in again.",
      });
    } catch (error: any) {
      console.error("Error saving changes:", error);
      setError(error.response?.data?.error || "Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className={applyTheme.card()}>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-palette-primary" />
          <span className="ml-2 text-slate-600">Loading matrix data...</span>
        </CardContent>
      </Card>
    );
  }

  if (error && !matrixData) {
    return (
      <Card className={applyTheme.card()}>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchMatrix} variant="outline">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!matrixData) {
    return null;
  }

  // Group sidebar items by section (module). Section order for stable display.
  const itemsBySection: Record<string, SidebarItem[]> = {};
  matrixData.sidebar_items.forEach((item) => {
    if (!itemsBySection[item.section]) {
      itemsBySection[item.section] = [];
    }
    itemsBySection[item.section].push(item);
  });
  const sectionOrder = Object.keys(itemsBySection).sort();
  const sectionTitles: Record<string, string> = {};
  sectionOrder.forEach((id) => {
    const items = itemsBySection[id];
    sectionTitles[id] = items[0]?.section_title ?? id;
  });

  const ROLE_ORDER = ['Admin', 'Agency', 'Executive', 'Director', 'Manager', 'Analyst', 'Auditor', 'Viewer'];
  const sortedRoles = [...matrixData.roles].sort((a, b) => {
    const aIndex = ROLE_ORDER.indexOf(a.name);
    const bIndex = ROLE_ORDER.indexOf(b.name);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  };

  return (
    <Card className={applyTheme.card()}>
      <CardHeader>
        <div>
          <CardTitle>Sidebar Permissions Matrix</CardTitle>
          <CardDescription>
            Manage which sidebar options each role can access. System roles (Viewer, Analyst, Manager, Director, Admin) can have permissions edited but cannot be renamed or deleted.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {hasChanges() && (
          <div className="mb-4 p-4 bg-amber-50 border-2 border-amber-400 rounded-lg">
            <p className="text-amber-800 font-medium">
              You have unsaved permission changes. Click &quot;Save Changes&quot; in the toolbar below to persist them to the database. Changes are not saved until you click Save.
            </p>
          </div>
        )}

        {/* Toolbar over table: Refresh / Save with space */}
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3">
          <Button onClick={fetchMatrix} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {hasChanges() && (
            <Button onClick={saveChanges} disabled={saving} size="sm">
              {saving ? (
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
          )}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-slate-200">
                <TableHead className="w-[250px] sticky left-0 bg-white z-10 pb-4 pt-0">Module / Sub-module</TableHead>
                {sortedRoles.map((role) => (
                  <TableHead key={role.id} className="text-center min-w-[120px] pb-4 pt-0">
                    <div className="flex flex-col items-center gap-1">
                      <span>{role.name}</span>
                      {role.is_system_role && (
                        <Badge variant="outline" className="text-xs">
                          System
                        </Badge>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectionOrder.map((sectionId) => {
                const items = itemsBySection[sectionId];
                const sectionTitle = sectionTitles[sectionId];
                const isExpanded = expandedSections.has(sectionId);
                return (
                  <React.Fragment key={sectionId}>
                    {/* Module row: section title + module-level checkboxes (derived from sub-modules) */}
                    <TableRow
                      className="bg-slate-100 hover:bg-slate-200/80 cursor-pointer border-b-2"
                      onClick={() => toggleSection(sectionId)}
                    >
                      <TableCell className="font-semibold sticky left-0 bg-slate-100 z-10">
                        <span className="inline-flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0" />
                          )}
                          {sectionTitle}
                        </span>
                      </TableCell>
                      {sortedRoles.map((role) => {
                        const checked = getModuleChecked(role.id, sectionId);
                        const indeterminate = getModuleIndeterminate(role.id, sectionId);
                        return (
                          <TableCell
                            key={role.id}
                            className="text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={indeterminate ? "indeterminate" : checked}
                              onCheckedChange={(value) =>
                                handleModuleChange(role.id, sectionId, value === true)
                              }
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {/* Sub-module rows (visible when section expanded) */}
                    {isExpanded &&
                      items.map((item) => (
                        <TableRow key={item.id} className="bg-white">
                          <TableCell className="pl-12 font-medium sticky left-0 bg-white z-10">
                            {item.title}
                          </TableCell>
                          {sortedRoles.map((role) => {
                            const displayValue = getAccessValue(role.id, item.id);
                            const types = [
                              { key: "view" as const, letter: "V" },
                              { key: "create" as const, letter: "C" },
                              { key: "edit" as const, letter: "E" },
                              { key: "delete" as const, letter: "D" },
                            ];
                            return (
                              <TableCell key={role.id} className="align-top py-2">
                                <div className="flex flex-col items-center gap-0.5">
                                  {types.map(({ key, letter }) => {
                                    const permCode = item.required_permissions[key];
                                    if (!permCode) {
                                      return (
                                        <div
                                          key={key}
                                          className="flex h-6 w-full min-w-[2.5rem] items-center justify-center"
                                          title={`${letter} not applicable`}
                                        >
                                          <span className="text-xs text-slate-300">—</span>
                                        </div>
                                      );
                                    }
                                    return (
                                      <label
                                        key={key}
                                        className="flex h-6 w-full min-w-[2.5rem] cursor-pointer items-center justify-center gap-1"
                                        title={letter === "V" ? "View" : letter === "C" ? "Create" : letter === "E" ? "Edit" : "Delete"}
                                      >
                                        <Checkbox
                                          checked={getPermissionChecked(role.id, item.id, key)}
                                          onCheckedChange={(c) =>
                                            handlePermissionChange(role.id, item.id, key, c as boolean)
                                          }
                                          className="h-3.5 w-3.5 shrink-0"
                                        />
                                        <span className="text-xs font-medium text-slate-600 w-4 text-left">
                                          {letter}
                                        </span>
                                      </label>
                                    );
                                  })}
                                  <Badge variant="outline" className="mt-0.5 text-xs font-mono">
                                    {displayValue}
                                  </Badge>
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600">
            <strong>Legend:</strong> V = View, C = Create, E = Edit, D = Delete. System roles can have permissions edited but cannot be renamed or deleted.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

