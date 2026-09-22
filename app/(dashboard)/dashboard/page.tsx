import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { interviews, answers, interviewReports } from "@/lib/db/schema";
import { eq, desc, count, avg, and } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, ArrowRight, Target, TrendingUp, CheckCircle2, Clock, BarChart3, ChevronRight } from "lucide-react";
import { InterviewCard } from "@/components/interviews/interview-card";
import { formatScore } from "@/lib/utils";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();

  const [allInterviews, completedInterviews, avgScore] = await Promise.all([
    db.select({ count: count() }).from(interviews).where(eq(interviews.userId, userId)),
    db.select({ count: count() }).from(interviews).where(
      and(eq(interviews.userId, userId), eq(interviews.status, "completed"))
    ),
    db.select({ avg: avg(interviews.overallScore) }).from(interviews).where(
      and(eq(interviews.userId, userId), eq(interviews.status, "completed"))
    ),
  ]);

  const totalCount = allInterviews[0]?.count ?? 0;
  const completedCount = completedInterviews[0]?.count ?? 0;
  const averageScore = Math.round(Number(avgScore[0]?.avg) || 0);
  const inProgressCount = totalCount - completedCount;

  const recentInterviews = await db.query.interviews.findMany({
    where: eq(interviews.userId, userId),
    orderBy: [desc(interviews.createdAt)],
    limit: 6,
    with: {
      questions: { columns: { id: true } },
    },
  });

  const firstName = user?.firstName || "there";

  return (
    <div className="container py-8 max-w-5xl animate-fade-in">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="label-sm mb-1.5">Dashboard</p>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {totalCount === 0
              ? "Start your first mock interview to get going."
              : `${completedCount} of ${totalCount} interview${totalCount !== 1 ? "s" : ""} completed.`}
          </p>
        </div>
        <Link href="/interviews/new">
          <Button size="sm" className="gap-1.5 shrink-0">
            <PlusCircle className="h-3.5 w-3.5" />
            New Interview
          </Button>
        </Link>
      </div>

      {/* ── Stats bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border mb-8 rounded-lg overflow-hidden border border-border">
        {[
          {
            label: "Total",
            value: totalCount,
            icon: Target,
            sub: "all time",
          },
          {
            label: "Completed",
            value: completedCount,
            icon: CheckCircle2,
            sub: totalCount > 0 ? `${Math.round((completedCount / totalCount) * 100)}% rate` : "—",
          },
          {
            label: "Avg Score",
            value: averageScore > 0 ? `${averageScore}%` : "—",
            icon: TrendingUp,
            sub: averageScore >= 70 ? "above average" : averageScore > 0 ? "keep going" : "no data",
          },
          {
            label: "In Progress",
            value: inProgressCount,
            icon: Clock,
            sub: "pending",
          },
        ].map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="bg-card px-5 py-4">
            <p className="label-sm mb-2">{label}</p>
            <p className="text-2xl font-extrabold tabular-nums tracking-tight leading-none">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Empty state ── */}
      {totalCount === 0 && (
        <div className="border border-dashed border-border rounded-lg py-14 px-8 text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-base mb-2">Create your first mock interview</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Choose a role, set your difficulty, and get AI-generated questions tailored to your experience.
          </p>
          <Link href="/interviews/new">
            <Button size="sm" className="gap-1.5">
              <PlusCircle className="h-3.5 w-3.5" />
              Create Interview
            </Button>
          </Link>
        </div>
      )}

      {/* ── Recent interviews ── */}
      {recentInterviews.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Recent Interviews</h2>
            <Link href="/interviews">
              <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground h-7">
                View all
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {recentInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={{
                  ...interview,
                  _count: { questions: interview.questions?.length ?? 0 },
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Tips ── */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="border-b border-border px-5 py-3 bg-secondary/30">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Quick tips
          </h3>
        </div>
        <ul className="divide-y divide-border">
          {[
            "Upload your resume for experience-based, tailored questions",
            "Enable your webcam for confidence and eye contact analysis",
            "Practice coding rounds with the built-in Monaco editor",
            "Review detailed reports to identify patterns in weak areas",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-3 px-5 py-3 text-sm text-muted-foreground hover:bg-secondary/20 transition-colors">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
