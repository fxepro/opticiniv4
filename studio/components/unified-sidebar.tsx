"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  ChevronRight, 
  ChevronLeft,
  Home,
  Inbox,
  LayoutDashboard,
  Search,
  Gauge,
  Activity,
  TrendingUp,
  BarChart3,
  Shield,
  ShieldCheck,
  Users,
  Monitor,
  Network,
  Wrench,
  Palette,
  MessageSquare,
  CreditCard,
  Settings,
  User as UserIcon,
  Cpu,
  Plug,
  Package,
  Clock,
  Cloud,
  Globe,
  CircleDollarSign,
  MapPin,
  Lock,
  Database,
  FileText,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Building2,
  Receipt,
  Bell,
  HelpCircle,
  Tag,
  Contact,
} from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";
import { sectionMatchesApp, WorkspaceAppId } from "@/lib/workspace-apps";

interface NavigationItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  permission?: string;
  badge?: string | null;
}

interface NavigationSection {
  id: string;
  title: string;
  icon?: string;
  permission?: string;
  items: NavigationItem[];
}

interface UnifiedSidebarProps {
  navigation: {
    sections: NavigationSection[];
  } | null;
  currentPath: string;
  collapsed?: boolean;
  onToggle?: () => void;
  activeAppId?: WorkspaceAppId | null;
  leftOffset?: number;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  LayoutDashboard,
  Search,
  Gauge,
  Activity,
  TrendingUp,
  BarChart3,
  Shield,
  Users,
  Monitor,
  Network,
  Wrench,
  Palette,
  MessageSquare,
  Inbox,
  CreditCard,
  Settings,
  User: UserIcon,
  Tool: Wrench, // Use Wrench as alternative for Tool icon (Tool doesn't exist in lucide-react)
  Cpu, // AI Health icon
  Plug, // Integrations icon
  Package, // WordPress icon
  Clock, // Coming Soon icon
  Cloud, // Cloud Monitoring icon
  Globe, // Multi-lingual icon
  CircleDollarSign, // Multi-currency icon
  MapPin, // Multi-location icon
  Lock, // Security icon
  Database, // Database Monitoring icon
  FileText, // Blogging icon
  Tag, // Versioning icon
  GraduationCap, // Learning/Collateral icon
  BookOpen, // Alternative learning icon
  ShieldCheck, // Security Audit icon
  CheckCircle2, // Assertions icon
  Building2, // Account / Organization
  Receipt, // Subscription
  Bell, // Notifications
  HelpCircle, // Support & Legal
  Contact, // People
};

export function UnifiedSidebar({
  navigation,
  currentPath,
  collapsed = false,
  onToggle,
  activeAppId = null,
  leftOffset = 0,
}: UnifiedSidebarProps) {
  const { hasPermission, permissions } = usePermissions();

  if (!navigation || !navigation.sections) {
    return (
      <aside 
        className={cn(
          "fixed left-0 top-0 h-screen border-r border-palette-accent-2 bg-palette-accent-2 shadow-lg transition-all duration-300 flex flex-col z-40",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-4 text-sm text-gray-500">No navigation available</div>
      </aside>
    );
  }

  // Navigation is already filtered on backend by permissions
  // Use it directly - backend filtering is the source of truth
  const filteredSections = navigation.sections.filter(section => 
    section.items && section.items.length > 0
  );

  // Transform navigation: Move SEO Monitoring to Performance and rename Monitoring
  // First, create deep copies of all sections and rename Monitoring + My Tools
  const transformedSections = filteredSections.map(section => ({
    ...section,
    title:
      section.id === "user_features" && section.title === "My Tools"
        ? "Performance"
        : section.title,
    items: section.items.map(item => {
      // Rename "Monitoring" to "Site Monitoring"
      if (item.id === 'monitoring' && item.title === 'Monitoring') {
        return { ...item, title: 'Site Monitoring' };
      }
      return { ...item };
    })
  }));

  // Find SEO Monitoring in Coming Soon section and move it to Performance
  const comingSoonSection = transformedSections.find(s => s.id === 'coming_soon');
  if (comingSoonSection) {
    const seoMonitoringIndex = comingSoonSection.items.findIndex(item => item.id === 'seo_monitoring');
    if (seoMonitoringIndex !== -1) {
      const seoMonitoringItem = comingSoonSection.items.splice(seoMonitoringIndex, 1)[0];
      
      // Find or create "Performance" section
      let myToolsSection = transformedSections.find(s => s.id === 'user_features');
      if (!myToolsSection) {
        myToolsSection = {
          id: 'user_features',
          title: 'Performance',
          icon: 'Tool',
          items: []
        };
        transformedSections.push(myToolsSection);
      }
      
      // Add SEO Monitoring to Performance if not already there
      if (!myToolsSection.items?.find(item => item.id === 'seo_monitoring')) {
        myToolsSection.items.push(seoMonitoringItem);
      }
    }
  }

  // Safety check: If user has site_audit.view but it's not in navigation, add it
  // This is a temporary fallback to ensure the item appears
  if (hasPermission('site_audit.view')) {
    const hasSiteAudit = transformedSections.some(section => 
      section.items?.some(item => item.id === 'site_audit')
    );
    if (!hasSiteAudit) {
      // Find or create "Performance" section
      let myToolsSection = transformedSections.find(s => s.id === 'user_features');
      if (!myToolsSection) {
        myToolsSection = {
          id: 'user_features',
          title: 'Performance',
          icon: 'Tool',
          items: []
        };
        transformedSections.push(myToolsSection);
      }
      // Add site-audit if not present
      if (!myToolsSection.items?.find(item => item.id === 'site_audit')) {
        myToolsSection.items.push({
          id: 'site_audit',
          title: 'Site Audit',
          href: '/workspace/site-audit',
          icon: 'Search',
          permission: 'site_audit.view'
        });
        console.warn('Site Audit was missing from navigation, added as fallback');
      }
    }
  }

  // Debug in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Sidebar - Navigation sections:', navigation.sections.length);
    console.log('Sidebar - Filtered sections:', transformedSections.length);
    console.log('Sidebar - Permissions:', permissions.length);
    // Check for compliance section specifically
    const complianceSection = navigation.sections.find(s => s.id === 'compliance');
    const complianceInTransformed = transformedSections.find(s => s.id === 'compliance');
    console.log('Compliance section in raw:', complianceSection ? 'YES' : 'NO');
    console.log('Compliance section in transformed:', complianceInTransformed ? 'YES' : 'NO');
  }

  // When an app is selected, filter to its sections; if multiple sections match the same app (e.g. performance + user_features), merge into one to avoid doubled sidebar items
  const matchedSections = activeAppId
    ? transformedSections.filter((section) => sectionMatchesApp(section, activeAppId))
    : transformedSections;

  const appFilteredSections = (() => {
    if (matchedSections.length <= 1) return matchedSections;
    // Merge sections that all belong to the same app: single section, combined items, deduplicated by href
    const seenHrefs = new Set<string>();
    const mergedItems: NavigationItem[] = [];
    let mergedTitle = matchedSections[0].title;
    let mergedId = matchedSections[0].id;
    for (const section of matchedSections) {
      for (const item of section.items ?? []) {
        const href = item.href ?? "";
        if (seenHrefs.has(href)) continue;
        seenHrefs.add(href);
        mergedItems.push(item);
      }
      // Prefer section title that looks like the app (e.g. "Performance" over "My Tools")
      if (section.title && section.id !== "user_features") mergedTitle = section.title;
    }
    return [{ id: mergedId, title: mergedTitle, items: mergedItems }];
  })();

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-palette-accent-2 bg-palette-accent-2 shadow-lg transition-all duration-300 flex flex-col z-40",
        collapsed ? "w-20" : "w-64"
      )}
      style={leftOffset ? { left: leftOffset } : undefined}
    >
      {/* Navigation Sections */}
      <div className={cn("flex-1 overflow-y-auto", collapsed ? "p-4 pt-4" : "p-6 pt-6")}>
        <div className="flex flex-col gap-6">
          {appFilteredSections.map((section) => (
            <div key={section.id}>
              {!collapsed && (
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
              )}
              <nav className="space-y-2">
                {section.items.map((item) => {
                  const isActive = currentPath === item.href;
                  const IconComponent = item.icon ? iconMap[item.icon] : null;
                  
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-palette-primary text-white shadow-md"
                          : "text-gray-700 hover:text-palette-primary hover:bg-palette-accent-3",
                        collapsed ? "justify-center" : "space-x-3"
                      )}
                    >
                      {IconComponent && <IconComponent className="flex-shrink-0 h-5 w-5" />}
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                        </div>
                      )}
                      {isActive && !collapsed && <ChevronRight className="h-4 w-4 flex-shrink-0" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>
      {onToggle && (
        <div className="p-2 border-t border-palette-accent-1 shrink-0">
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="w-full flex items-center justify-center rounded-lg p-2 text-gray-500 hover:text-palette-primary hover:bg-palette-accent-3 transition"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
      )}
    </aside>
  );
}

