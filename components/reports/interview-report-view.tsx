"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Trophy, TrendingUp, MessageSquare, Target, Star, AlertCircle, Lightbulb, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScoreChart } from "@/components/reports/score-chart";
import { cn, formatDate, getScoreColor } from "@/lib/utils";

function AutoRefresh() {
  const router = useRouter();
  useEffect(() => {
    const t = setInterval(() => router.refresh(), 4000);
    return () => clearInterval(t);
  }, [router]);
  return null;
}

interface ReportProps {
  interview: {
    id: string;
    title: string;
    role: string;
    interviewType: string;
    difficulty: string;
    duration?: number | null;
    completedAt?: Date | null;
    createdAt: Date;
  };
  report: {
    overallScore?: number | null;
    technicalScore?: number | null;
    communicationScore?: number | null;
    confidenceScore?: number | null;
    problemSolvingScore?: number | null;
    strengths?: string[] | null;
    weaknesses?: string[] | null;
    improvements?: string[] | null;
    detailedFeedback?: string | null;
    recommendations?: string[] | null;
    nextSteps?: string[] | null;
    questionBreakdown?: unknown;
    emotionSummary?: unknown;
  } | null;
  questionsWithAnswers: Array<{
    id: string;
    questionText: string;
    questionType: string;
    difficulty: string;
    orderIndex: number;
    answers: Array<{
      score?: number | null;
      feedback?: string | null;
      answerText?: string | null;
      timeTaken?: number | null;
      strengths?: string[] | null;
      improvements?: string[] | null;
    }>;
  }>;
}

export function InterviewReportView({ interview, report, questionsWithAnswers }: ReportProps) {
  const overallScore = report?.overallScore ?? 0;

  const getScoreLabel = (score: number) => {
    if (score >= 85) return { label: "Excellent", color: "text-green-500" };
    if (score >= 70) return { label: "Good", color: "text-blue-500" };
    if (score >= 55) return { label: "Average", color: "text-yellow-500" };
    return { label: "Needs Work", color: "text-red-500" };
  };

  const scoreLabel = getScoreLabel(overallScore);

  const scoreCategories = [
    { label: "Technical", value: report?.technicalScore ?? 0, icon: "💻" },
    { label: "Communication", value: report?.communicationScore ?? 0, icon: "🗣️" },
    { label: "Confidence", value: report?.confidenceScore ?? 0, icon: "💪" },
    { label: "Problem Solving", value: report?.problemSolvingScore ?? 0, icon: "🧠" },
  ];

  if (!report) {
    return (
      <div className="container py-20 text-center max-w-lg">
        <div className="border border-border rounded-lg p-12 bg-card text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-6">
            <div className="h-6 w-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
          <h2 className="text-xl font-bold mb-3">Generating your report…</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            AI is analyzing your answers. This takes 15–30 seconds.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block animate-pulse" />
            <span>Page refreshes automatically</span>
          </div>
        </div>
        <AutoRefresh />
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-5xl space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 animate-fade-in">
        <div className="flex items-center gap-4">
          <Link href="/interviews">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">{interview.title}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {interview.role} • {formatDate(interview.completedAt || interview.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Overall Score Hero */}
      <Card className="border-border animate-slide-up">
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="text-center shrink-0">
              <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mx-auto mb-3">
                <Trophy className="h-10 w-10 text-primary" />
              </div>
              <p className="text-5xl font-extrabold tabular-nums tracking-tight">{Math.round(overallScore)}</p>
              <p className={cn("font-semibold text-base mt-1", scoreLabel.color)}>{scoreLabel.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Overall score</p>
            </div>
            <div className="flex-1 space-y-4 w-full">
              {scoreCategories.map((cat, i) => (
                <div key={cat.label} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold flex items-center gap-2">
                      <span className="text-xl">{cat.icon}</span> {cat.label}
                    </span>
                    <span className={cn("text-lg font-black", getScoreColor(cat.value))}>
                      {Math.round(cat.value)}%
                    </span>
                  </div>
                  <Progress
                    value={cat.value}
                    className={cn(
                      "h-2",
                      cat.value >= 70 ? "[&>div]:bg-green-500" :
                        cat.value >= 50 ? "[&>div]:bg-yellow-500" :
                          "[&>div]:bg-red-500"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="improvement">Improvement</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Detailed Feedback */}
          {report.detailedFeedback && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" /> AI Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{report.detailedFeedback}</p>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {/* Strengths */}
            {report.strengths && report.strengths.length > 0 && (
              <Card className="border-green-500/20 bg-green-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {report.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Star className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Weaknesses */}
            {report.weaknesses && report.weaknesses.length > 0 && (
              <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                    <XCircle className="h-4 w-4" /> Areas to Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {report.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <ScoreChart categories={scoreCategories} />
        </TabsContent>

        {/* Questions */}
        <TabsContent value="questions" className="space-y-4 mt-4">
          {questionsWithAnswers.map((q, i) => {
            const answer = q.answers[0];
            const score = answer?.score ?? null;
            return (
              <Card key={q.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">Q{i + 1}</Badge>
                        <Badge variant="outline" className="text-xs capitalize">{q.questionType.replace("_", " ")}</Badge>
                      </div>
                      <p className="font-medium text-sm">{q.questionText}</p>
                    </div>
                    {score !== null && (
                      <div className="text-right shrink-0">
                        <span className={cn("text-2xl font-black", getScoreColor(score))}>{Math.round(score)}</span>
                        <p className="text-xs text-muted-foreground">/100</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                {answer && (
                  <CardContent className="space-y-3">
                    {answer.answerText && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Your Answer</p>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                          {answer.answerText}
                        </p>
                      </div>
                    )}
                    {answer.feedback && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">AI Feedback</p>
                        <p className="text-sm">{answer.feedback}</p>
                      </div>
                    )}
                    {score !== null && (
                      <Progress
                        value={score}
                        className={cn(
                          "h-1.5",
                          score >= 70 ? "[&>div]:bg-green-500" :
                            score >= 50 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"
                        )}
                      />
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </TabsContent>

        {/* Improvement Plan */}
        <TabsContent value="improvement" className="space-y-4 mt-4">
          {report.improvements && report.improvements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" /> Improvement Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.improvements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                        {i + 1}
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {report.recommendations && report.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" /> Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {report.nextSteps && report.nextSteps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" /> Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {report.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Badge variant="outline" className="text-xs shrink-0">{i + 1}</Badge>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
        <Link href="/interviews/new" className="flex-1">
          <Button variant="gradient" className="w-full gap-2">
            <Target className="h-4 w-4" /> Practice Again
          </Button>
        </Link>
        <Link href="/analytics">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="h-4 w-4" /> View Analytics
          </Button>
        </Link>
      </div>
    </div>
  );
}
