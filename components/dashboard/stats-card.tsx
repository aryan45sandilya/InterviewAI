import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  iconColor?: string;
  bgColor?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  iconColor,
  bgColor,
}: StatsCardProps) {
  return (
    <div className="border border-border rounded-lg p-5 bg-card hover:border-border/80 transition-colors duration-150 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <div className={cn("p-1.5 rounded", bgColor || "bg-secondary")}>
          <Icon className={cn("h-3.5 w-3.5", iconColor || "text-muted-foreground")} />
        </div>
      </div>

      <p className="text-3xl font-extrabold tabular-nums tracking-tight text-foreground leading-none mb-2">
        {value}
      </p>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {trend && (
        <p className="text-xs font-medium text-green-600 dark:text-green-400 mt-1">{trend}</p>
      )}
    </div>
  );
}
