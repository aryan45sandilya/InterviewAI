"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, PlusCircle, FileText, BarChart3,
  Settings, Upload, Code2, Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/interviews/new", label: "New Interview", icon: PlusCircle, accent: true },
  { href: "/interviews", label: "My Interviews", icon: FileText },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

const toolsNav = [
  { href: "/resume", label: "Resume Manager", icon: Upload },
  { href: "/coding", label: "Coding Practice", icon: Code2 },
];

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  accent,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  accent?: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded text-[13px] font-medium transition-colors duration-150",
          active
            ? "bg-secondary text-foreground"
            : accent
            ? "text-primary hover:bg-primary/10 hover:text-primary"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4 shrink-0",
            active ? "text-foreground" : accent ? "text-primary" : "text-muted-foreground"
          )}
        />
        <span>{label}</span>
        {active && (
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
        )}
      </div>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-56 min-h-screen border-r border-border bg-background/50 py-4 px-3 gap-1">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 pb-4 mb-1 border-b border-border">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-primary shrink-0">
          <Brain className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm leading-tight">InterviewAI</p>
          <p className="text-[11px] text-muted-foreground leading-tight">AI Mock Platform</p>
        </div>
      </div>

      {/* Main nav */}
      <div className="flex flex-col gap-0.5">
        <p className="label-sm px-3 mb-1 mt-3">Main</p>
        {mainNav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive}
              accent={item.accent}
            />
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-border my-2" />

      {/* Tools nav */}
      <div className="flex flex-col gap-0.5">
        <p className="label-sm px-3 mb-1">Tools</p>
        {toolsNav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive}
            />
          );
        })}
      </div>

      {/* Bottom */}
      <div className="mt-auto border-t border-border pt-2">
        <NavItem
          href="/settings"
          label="Settings"
          icon={Settings}
          active={pathname === "/settings"}
        />
      </div>
    </aside>
  );
}
