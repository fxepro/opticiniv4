"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileCheck,
  FolderOpen,
  GitBranch,
  GraduationCap,
  Heart,
  Home,
  LayoutDashboard,
  Plug,
  Search,
  Settings,
  Shield,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  WORKSPACE_APPS,
  SIDEBAR_ORDER,
  WorkspaceAppId,
  getDefaultHrefForApp,
  sectionMatchesApp,
} from "@/lib/workspace-apps";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Search,
  Heart,
  Zap,
  Shield,
  Settings,
  FileCheck,
  FolderOpen,
  GitBranch,
  DollarSign,
  AlertTriangle,
  LayoutDashboard,
  User,
  GraduationCap,
  Plug,
};

interface MainSidebarProps {
  navigation: { sections?: { id?: string; title?: string; items?: { href?: string }[] }[] } | null;
  activeAppId: WorkspaceAppId | null;
  onSelectApp: (appId: WorkspaceAppId) => void;
  width?: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  currentPath?: string;
}

export function MainSidebar({
  navigation,
  activeAppId,
  onSelectApp,
  width = 80,
  collapsed = false,
  onToggleCollapse,
  currentPath = "",
}: MainSidebarProps) {
  const sections = navigation?.sections ?? [];
  const isAppVisible = (app: (typeof WORKSPACE_APPS)[number]) =>
    sections.some((section) => sectionMatchesApp(section, app.id));
  const getApp = (id: WorkspaceAppId) => WORKSPACE_APPS.find((a) => a.id === id);

  // Build ordered list with separators (only include separator when previous item was a visible app)
  type SidebarItem = { type: "separator" } | { type: "app"; app: (typeof WORKSPACE_APPS)[number] };
  const sidebarItems: SidebarItem[] = [];
  let prevWasApp = false;
  for (const entry of SIDEBAR_ORDER) {
    if (entry === "separator") {
      if (prevWasApp) sidebarItems.push({ type: "separator" });
      prevWasApp = false;
    } else {
      const app = getApp(entry);
      if (app && isAppVisible(app)) {
        sidebarItems.push({ type: "app", app });
        prevWasApp = true;
      }
    }
  }

  const iconSize = collapsed ? "h-6 w-6" : "h-5 w-5";
  const labelClass = collapsed ? "sr-only" : "text-xs";

  const renderAppLink = (app: (typeof WORKSPACE_APPS)[number]) => {
    const Icon = iconMap[app.icon];
    const href = getDefaultHrefForApp(navigation, app.id);
    const isActive =
      activeAppId === app.id ||
      (app.id === "home"
        ? currentPath === "/workspace" ||
          currentPath === "/workspace/" ||
          currentPath === "/workspace/home" ||
          currentPath.startsWith("/workspace/home/")
        : app.pathPrefixes.some(
            (prefix) =>
              currentPath === prefix || currentPath.startsWith(`${prefix}/`)
          ));
    return (
      <Link
        key={app.id}
        href={href}
        onClick={() => onSelectApp(app.id)}
        className={cn(
          "group flex flex-col items-center gap-1 rounded-lg px-2 py-2 font-medium transition",
          isActive
            ? "bg-palette-primary text-white shadow-md"
            : "text-white/85 hover:text-white hover:bg-palette-primary-hover"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {Icon && <Icon className={iconSize} />}
        <span className={cn(labelClass, "leading-tight text-center")}>
          {app.label}
        </span>
      </Link>
    );
  };

  return (
    <aside
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-palette-primary bg-palette-primary shadow-lg z-50 flex flex-col"
      style={{ width }}
      aria-label="Main navigation"
    >
      <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-2 flex flex-col gap-2">
        {sidebarItems.map((item, i) =>
          item.type === "separator" ? (
            <div
              key={`sep-${i}`}
              className="my-1 border-t border-white/25 shrink-0"
              aria-hidden
            />
          ) : (
            renderAppLink(item.app)
          )
        )}
      </div>
      {onToggleCollapse && (
        <div className="p-2 border-t border-white/25">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-full text-white/85 hover:text-white hover:bg-palette-primary-hover"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
      )}
    </aside>
  );
}
