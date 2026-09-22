import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowRight, Mic, Brain, Code2, FileText, BarChart3, Video, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Navigation ── */}
      <header className="fixed top-0 w-full z-50 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-base tracking-tight">InterviewAI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="gap-1.5">
                Get started
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40" />

        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1.5 rounded text-xs font-semibold text-primary uppercase tracking-widest mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block animate-pulse" />
                AI Mock Interview Platform
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
                Practice harder.
                <br />
                <span className="text-primary">Perform better.</span>
                <br />
                Get hired.
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                Realistic AI mock interviews with voice answers, emotion analysis,
                and detailed performance reports — all tailored to your target role.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-2 h-11 px-7 text-[15px]">
                    Start practicing free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="outline" size="lg" className="h-11 px-7 text-[15px]">
                    Sign in
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Free to start
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  2 min setup
                </span>
              </div>
            </div>

            {/* Right: Product visualization */}
            <div className="animate-slide-up lg:animate-fade-in">
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                {/* Window chrome */}
                <div className="border-b border-border px-4 py-2.5 flex items-center justify-between bg-secondary/30">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="label-sm">Live session</span>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-muted-foreground">00:04:17</span>
                </div>

                {/* Question */}
                <div className="p-5 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="label-sm">Question 4 / 8</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Technical</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    How would you design a distributed rate limiter that handles
                    100,000 requests per second across multiple servers?
                  </p>
                </div>

                {/* Voice waveform */}
                <div className="px-5 py-3.5 border-b border-border bg-secondary/20">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-[3px] items-end h-5">
                      {[3, 6, 9, 7, 5, 8, 6, 4, 7, 5, 9, 6, 4].map((h, i) => (
                        <div
                          key={i}
                          className="w-[3px] bg-primary/70 rounded-sm"
                          style={{ height: `${h * 2}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">Listening…</span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="h-1 w-20 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-primary/60 rounded-full" />
                      </div>
                      <span className="text-xs font-mono tabular-nums text-muted-foreground">0:47</span>
                    </div>
                  </div>
                </div>

                {/* Scores */}
                <div className="px-5 py-4 space-y-2.5">
                  {[
                    { label: "Technical depth", pct: 78 },
                    { label: "Communication", pct: 85 },
                    { label: "Problem solving", pct: 71 },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <span className="text-[11px] text-muted-foreground w-28 shrink-0">{s.label}</span>
                      <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] tabular-nums font-semibold text-foreground w-7 text-right">
                        {s.pct}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="px-5 pb-5 flex gap-2">
                  <button className="flex-1 text-xs py-2 border border-border rounded text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors">
                    Skip
                  </button>
                  <button className="flex-1 text-xs py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors">
                    Submit answer
                  </button>
                </div>
              </div>

              {/* Caption */}
              <p className="text-xs text-muted-foreground text-center mt-3">
                Real-time AI scoring during your answer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-border py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Interviews completed" },
              { value: "95%", label: "User satisfaction" },
              { value: "3×", label: "Faster preparation" },
              { value: "500+", label: "Companies covered" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold tabular-nums tracking-tight text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="label-sm mb-3">Features</p>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Everything in one platform
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {[
              {
                icon: Brain,
                number: "01",
                title: "AI-generated questions",
                desc: "Tailored to your role, experience level, and tech stack using GPT-4o and Gemini 2.5.",
              },
              {
                icon: Mic,
                number: "02",
                title: "Voice answers",
                desc: "Speak naturally. OpenAI Whisper transcribes your answers in real time with high accuracy.",
              },
              {
                icon: Video,
                number: "03",
                title: "Emotion analysis",
                desc: "Webcam-based confidence tracking using MediaPipe — see your eye contact and attention scores.",
              },
              {
                icon: Code2,
                number: "04",
                title: "Live coding rounds",
                desc: "Monaco editor with multi-language support. Solve problems in Python, TypeScript, Go, and more.",
              },
              {
                icon: FileText,
                number: "05",
                title: "Resume-based questions",
                desc: "Upload your PDF resume. The AI generates questions based on your actual experience.",
              },
              {
                icon: BarChart3,
                number: "06",
                title: "Detailed reports",
                desc: "Scores across technical depth, communication, confidence, and problem solving — with improvement plans.",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.number} className="bg-background p-8 group hover:bg-secondary/30 transition-colors duration-200">
                  <div className="flex items-start gap-5">
                    <div className="shrink-0">
                      <span className="label-sm">{f.number}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-[15px]">{f.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 px-4 border-t border-border">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-16">
            <p className="label-sm mb-3">Process</p>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Interview-ready in three steps
            </h2>
          </div>

          <div className="space-y-0">
            {[
              {
                step: "01",
                title: "Configure your interview",
                desc: "Choose your target role, experience level, interview type, and tech stack. Optionally upload your resume for tailored questions.",
              },
              {
                step: "02",
                title: "Practice with the AI interviewer",
                desc: "Answer questions via voice or text. The AI adapts follow-up questions based on your responses. Optional webcam analysis tracks confidence and eye contact.",
              },
              {
                step: "03",
                title: "Review your performance report",
                desc: "Get a detailed breakdown: scores per question, strengths, weaknesses, and a specific improvement plan — ready in under a minute.",
              },
            ].map((item, i) => (
              <div key={item.step} className="flex gap-8 py-8 border-b border-border last:border-0">
                <div className="shrink-0 w-12">
                  <span className="text-4xl font-extrabold text-border">{item.step}</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 border-t border-border">
        <div className="container max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight mb-3">
                Ready to start practicing?
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Free to start. No credit card required.
                Your first interview session takes under two minutes to set up.
              </p>
            </div>
            <Link href="/sign-up" className="shrink-0">
              <Button size="lg" className="gap-2 h-11 px-8 text-[15px]">
                Get started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Brain className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm">InterviewAI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2025 InterviewAI. Built by Aryan Sandilya.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/sign-in" className="hover:text-foreground transition-colors">Sign in</Link>
            <Link href="/sign-up" className="hover:text-foreground transition-colors">Get started</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
