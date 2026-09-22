import { formatRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  status: string;
  interviewType: string;
  overallScore?: number | null;
  createdAt: Date;
}

const statusVariant: Record<string, "success" | "warning" | "secondary" | "outline"> = {
  completed: "success",
  in_progress: "warning",
  pending: "secondary",
};

export function RecentActivity({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground flex flex-col items-center gap-3">
        <Calendar className="h-8 w-8 text-border" />
        <p>No activity yet</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center justify-between gap-4 py-3 px-1 hover:bg-secondary/20 transition-colors rounded">
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{activity.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatRelativeTime(activity.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {activity.overallScore != null && (
              <span className="text-sm font-bold tabular-nums">
                {Math.round(activity.overallScore)}%
              </span>
            )}
            <Badge variant={statusVariant[activity.status] ?? "outline"}>
              {activity.status.replace("_", " ")}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
