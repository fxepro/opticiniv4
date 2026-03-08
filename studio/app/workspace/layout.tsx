"use client";
import "@/lib/axios-config";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { UnifiedSidebar } from "@/components/unified-sidebar";
import { MainSidebar } from "@/components/main-sidebar";
import { UnifiedHeader } from "@/components/unified-header";
import { PermissionProvider } from "@/contexts/permission-context";
import { cn } from "@/lib/utils";
import {
  getAppIdForPath,
  getDefaultAppId,
  getDefaultHrefForApp,
  isWorkspaceAppId,
  WorkspaceAppId,
} from "@/lib/workspace-apps";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [navigation, setNavigation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [apiUnavailable, setApiUnavailable] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mainSidebarCollapsed, setMainSidebarCollapsed] = useState(false);
  const [activeAppId, setActiveAppId] = useState<WorkspaceAppId | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const lastFetchPathRef = useRef<string | null>(null);
  const mainSidebarWidth = mainSidebarCollapsed ? 56 : 112;
  const expandedSidebarWidth = 256;
  const collapsedSidebarWidth = 80;

  useEffect(() => {
    // Allow login page without authentication
    if (pathname === '/workspace/login') {
      setLoading(false);
      return;
    }

    // Check authentication
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    
    if (!token) {
      router.push("/workspace/login");
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

    // Helper function to make authenticated request
    const makeRequest = async (url: string, currentToken: string) => {
      try {
        return await axios.get(url, {
          headers: { Authorization: `Bearer ${currentToken}` },
        });
      } catch (err: any) {
        // If 401, try to refresh token and retry
        if (err.response?.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            return await axios.get(url, {
              headers: { Authorization: `Bearer ${newToken}` },
            });
          }
          throw err; // Re-throw if refresh failed
        }
        throw err;
      }
    };

    // Avoid re-fetching for the same path unless a previous attempt failed
    if (lastFetchPathRef.current === pathname) {
      return;
    }
    lastFetchPathRef.current = pathname;

    // Fetch user info and navigation
    // Add cache-busting timestamp to ensure fresh data (prevents browser/API caching)
    const cacheBuster = `?t=${Date.now()}`;
    // Construct URLs properly - handle empty API_BASE (relative URLs)
    // Remove trailing slash from API_BASE if present, then add path with trailing slash before query params
    const baseUrl = API_BASE?.replace(/\/$/, '') || '';
    const userInfoUrl = `${baseUrl}/api/user-info/${cacheBuster}`;
    const navigationUrl = `${baseUrl}/api/navigation/${cacheBuster}`;
    
    Promise.all([
      makeRequest(userInfoUrl, token),
      makeRequest(navigationUrl, token),
    ])
      .then(([userRes, navRes]) => {
        setUser(userRes.data);
        setNavigation(navRes.data);
        setApiUnavailable(false);
        // Debug: Log navigation in development
        if (process.env.NODE_ENV === 'development') {
          console.log('=== NAVIGATION DEBUG ===');
          console.log('Full navigation response:', JSON.stringify(navRes.data, null, 2));
          const allSections = navRes.data?.sections || [];
          console.log('Number of sections:', allSections.length);
          allSections.forEach((section: any, idx: number) => {
            console.log(`Section ${idx}: ${section.id} (${section.title}) - ${section.items?.length || 0} items`);
            section.items?.forEach((item: any) => {
              console.log(`  - ${item.id}: ${item.title} (${item.href})`);
            });
          });
          // Check for specific items (debug-only)
          const allItems = allSections.flatMap((s: any) => s.items || []);
          const complianceSection = allSections.find((s: any) => s.id === 'compliance');
          const siteAuditItem = allItems.find((item: any) => item.id === 'site_audit');
          const aiMonitoringItem = allItems.find((item: any) => item.id === 'ai_health');
          const dbMonitoringItem = allItems.find((item: any) => item.id === 'database_monitoring');
          console.log('Compliance section present:', !!complianceSection);
          console.log('Site Audit item found:', siteAuditItem);
          console.log('AI Monitoring item found:', aiMonitoringItem);
          console.log('Database Monitoring item found:', dbMonitoringItem);
          console.log('User permissions:', userRes.data?.permissions?.length || 0);
          console.log('User is_superuser:', userRes.data?.is_superuser);
          console.log('Has ai_health.view:', userRes.data?.permissions?.includes('ai_health.view'));
          console.log('Has database_monitoring.view:', userRes.data?.permissions?.includes('database_monitoring.view'));
          console.log('======================');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading workspace:", err);
        console.error("API_BASE:", API_BASE || '(empty - using relative URLs)');
        console.error("User Info URL:", userInfoUrl);
        console.error("Navigation URL:", navigationUrl);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        console.error("Error message:", err.message);
        console.error("Error code:", err.code);
        
        // Handle network errors (CORS, connection refused, etc.)
        if (err.code === 'ERR_NETWORK' || err.message === 'Network Error' || !err.response) {
          console.error("Network Error: Cannot connect to API. Check that:");
          console.error("1. Django backend is running");
          console.error("2. NEXT_PUBLIC_API_BASE_URL is set correctly in environment variables");
          console.error("3. CORS is configured to allow requests from this origin");
          console.error("4. API endpoint is accessible");
          // Don't clear tokens on network errors - might be temporary
          setLoading(false);
          return;
        }
        
        // Clear tokens on any auth error
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          router.push("/workspace/login");
        } else if (err.response?.status === 404) {
          // 404 means API endpoint not found - proxy/backend not configured
          console.error("404 Error: API endpoint not found. Start Django backend or set BACKEND_URL for production.");
          setApiUnavailable(true);
          setLoading(false);
        } else {
          // Other errors - don't redirect, just show error state
          setLoading(false);
        }
        // Allow retry after a failure
        lastFetchPathRef.current = null;
      });
  }, [pathname]);

  // Load sidebar collapsed state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pagerodeo_workspace_sidebar_collapsed");
      setSidebarCollapsed(stored === "true");
      const mainStored = localStorage.getItem("pagerodeo_workspace_main_sidebar_collapsed");
      setMainSidebarCollapsed(mainStored === "true");
    }
  }, []);

  // Sync active app with navigation + current path
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!navigation?.sections) return;
    const fromPath = getAppIdForPath(navigation, pathname);
    const stored = localStorage.getItem("pagerodeo_workspace_active_app");
    const storedAppId = isWorkspaceAppId(stored) ? stored : null;
    const defaultAppId = getDefaultAppId(navigation);
    const nextAppId = fromPath || storedAppId || defaultAppId;
    if (nextAppId) {
      setActiveAppId((current) => (current === nextAppId ? current : nextAppId));
    }
  }, [navigation, pathname]);

  // Save sidebar collapsed state
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pagerodeo_workspace_sidebar_collapsed", String(sidebarCollapsed));
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "pagerodeo_workspace_main_sidebar_collapsed",
        String(mainSidebarCollapsed)
      );
    }
  }, [mainSidebarCollapsed]);

  // Persist active app selection
  useEffect(() => {
    if (typeof window !== "undefined" && activeAppId) {
      localStorage.setItem("pagerodeo_workspace_active_app", activeAppId);
    }
  }, [activeAppId]);

  const handleSelectApp = (appId: WorkspaceAppId) => {
    setActiveAppId(appId);
    const targetHref = getDefaultHrefForApp(navigation, appId);
    if (targetHref && targetHref !== pathname) {
      router.push(targetHref);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-palette-accent-3 via-white to-palette-accent-3">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-palette-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  // Login page doesn't need layout wrapper
  if (pathname === '/workspace/login') {
    return <>{children}</>;
  }

  return (
    <PermissionProvider user={user} permissions={user?.permissions || []}>
      <div className="min-h-screen bg-gradient-to-br from-palette-accent-3 to-palette-accent-2/80 flex flex-col">
        <UnifiedHeader
          user={user}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
          navigation={navigation}
          currentPath={pathname}
        />
        <MainSidebar
          navigation={navigation}
          activeAppId={activeAppId}
          onSelectApp={handleSelectApp}
          width={mainSidebarWidth}
          collapsed={mainSidebarCollapsed}
          onToggleCollapse={() => setMainSidebarCollapsed((prev) => !prev)}
          currentPath={pathname}
        />
        <UnifiedSidebar
          navigation={navigation}
          currentPath={pathname}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
          activeAppId={activeAppId}
          leftOffset={mainSidebarWidth}
        />
        <main
          className={cn("pt-16 flex-1 transition-all duration-300")}
          style={{
            marginLeft:
              mainSidebarWidth +
              (sidebarCollapsed ? collapsedSidebarWidth : expandedSidebarWidth),
          }}
        >
          {apiUnavailable && (
            <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-4 py-2 text-sm text-center">
              API unavailable (404). Start the Django backend, or in production set <code className="bg-amber-200/80 px-1 rounded">BACKEND_URL</code> so /api/* is proxied.
            </div>
          )}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </PermissionProvider>
  );
}

