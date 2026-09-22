"use client";

import Link from "next/link";
import { Clock, MessageSquare, BarChart2, Play, Eye, Trash2, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn, formatDate, formatScore, getInterviewTypeIcon } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface InterviewCardProps {
  interview: {
    id: string;
    title: string;
    role: string;
    difficulty: string;
    interviewType: string;
    status: string;
    techStack?: string[] | null;
    overallScore?: number | null;
    duration?: number | null;
    createdAt: Date;
    _count?: { questions: number };
  };
}

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "outline" | "secondary" }> = {
  completed: { label: "Completed", variant: "success" },
  in_progress: { label: "In progress", variant: "warning" },
  pending: { label: "Not started", variant: "secondary" },
};

const difficultyConfig: Record<string, { variant: "destructive" | "warning" | "info" | "outline" }> = {
  hard: { variant: "destructive" },
  medium: { variant: "warning" },
  easy: { variant: "info" },
};

export function InterviewCard({ interview }: InterviewCardProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this interview? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/interviews/${interview.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Interview deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete interview");
    } finally {
      setDeleting(false);
    }
  };

  const isCompleted = interview.status === "completed";
  const isInProgress = interview.status === "in_progress";
  const status = statusConfig[interview.status] ?? { label: interview.status, variant: "outline" as const };
  const difficulty = difficultyConfig[interview.difficulty.toLowerCase()] ?? { variant: "outline" as const };

  return (
    <div className="border border-border rounded-lg bg-card hover:border-border/70 transition-colors duration-150 flex flex-col">
      {/* Card header */}
      <div className="px-4 pt-4 pb-3 border-b border-border/50 flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="text-xl mt-0.5 shrink-0">{getInterviewTypeIcon(interview.interviewType)}</span>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm leading-tight line-clamp-1">{interview.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{interview.role}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground -mr-1">
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm">
            {isCompleted && (
              <DropdownMenuItem asChild>
                <Link href={`/interviews/${interview.id}/report`}>
                  <Eye className="h-3.5 w-3.5 mr-2" /> View Report
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:text-destructive"
              disabled={deleting}
            >
              <Trash2 className="h-3.5 w-3.5 mr-2" />
              {deleting ? "Deleting…" : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Card body */}
      <div className="px-4 py-3 flex-1 space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={difficulty.variant}>{interview.difficulty}</Badge>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>

        {/* Tech stack */}
        {interview.techStack && interview.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {interview.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-muted-foreground">
                {tech}
              </Badge>
            ))}
            {interview.techStack.length > 3 && (
              <Badge variant="outline" className="text-muted-foreground">
                +{interview.techStack.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          {interview._count?.questions != null && (
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {interview._count.questions} questions
            </span>
          )}
          {isCompleted && interview.overallScore != null && (
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <BarChart2 className="h-3 w-3 text-primary" />
              {formatScore(interview.overallScore)}
            </span>
          )}
          <span className="flex items-center gap-1 ml-auto">
            <Clock className="h-3 w-3" />
            {formatDate(interview.createdAt)}
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-4 pb-4 pt-0">
        {isCompleted ? (
          <Link href={`/interviews/${interview.id}/report`} className="block">
            <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
              <Eye className="h-3.5 w-3.5" /> View Report
            </Button>
          </Link>
        ) : (
          <Link href={`/interviews/${interview.id}/room`} className="block">
            <Button
              variant={isInProgress ? "default" : "outline"}
              size="sm"
              className="w-full gap-1.5 text-xs"
            >
              <Play className="h-3.5 w-3.5" />
              {isInProgress ? "Continue" : "Start Interview"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
