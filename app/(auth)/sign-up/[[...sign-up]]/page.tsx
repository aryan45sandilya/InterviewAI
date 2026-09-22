import { SignUp } from "@clerk/nextjs";
import { Brain, Zap, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Sign Up" };

const clerkAppearance = {
  variables: {
    colorPrimary: "hsl(27, 90%, 52%)",
    colorBackground: "hsl(22, 7%, 9%)",
    colorInputBackground: "hsl(25, 6%, 14%)",
    colorText: "hsl(36, 18%, 91%)",
    colorTextSecondary: "hsl(28, 8%, 52%)",
    colorInputText: "hsl(36, 18%, 91%)",
    colorNeutral: "hsl(25, 6%, 35%)",
    colorDanger: "hsl(0, 65%, 52%)",
    borderRadius: "0.5rem",
    spacingUnit: "16px",
    fontSize: "15px",
  },
  elements: {
    rootBox: "w-full",
    card: "bg-transparent shadow-none border-0 p-0 gap-5",
    headerTitle: "text-xl font-bold text-[hsl(36,18%,91%)] tracking-tight",
    headerSubtitle: "text-sm text-[hsl(28,8%,52%)]",
    socialButtonsBlockButton:
      "border border-[hsl(25,6%,18%)] bg-[hsl(25,6%,14%)] text-[hsl(36,18%,91%)] hover:bg-[hsl(25,6%,18%)] transition-colors",
    dividerLine: "bg-[hsl(25,6%,18%)]",
    dividerText: "text-[hsl(28,8%,52%)] text-xs",
    formFieldLabel: "text-[11px] font-semibold uppercase tracking-widest text-[hsl(28,8%,52%)]",
    formFieldInput:
      "bg-[hsl(25,6%,14%)] border border-[hsl(25,6%,18%)] text-[hsl(36,18%,91%)] placeholder:text-[hsl(28,8%,38%)] rounded-[0.5rem] focus:border-[hsl(27,90%,52%)] focus:ring-0 focus:shadow-none h-10 text-sm",
    formButtonPrimary:
      "bg-[hsl(27,90%,52%)] hover:bg-[hsl(27,90%,46%)] text-[hsl(22,8%,6%)] font-semibold h-10 rounded-[0.5rem] text-sm transition-colors shadow-none",
    footerActionLink:
      "text-[hsl(27,90%,52%)] hover:text-[hsl(27,90%,60%)] font-medium",
    identityPreviewText: "text-[hsl(36,18%,91%)]",
    identityPreviewEditButton: "text-[hsl(27,90%,52%)]",
    alertText: "text-sm",
    formResendCodeLink: "text-[hsl(27,90%,52%)]",
  },
};

const steps = [
  { num: "01", label: "Create your free account" },
  { num: "02", label: "Set your target role & stack" },
  { num: "03", label: "Start your first mock interview" },
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 border-r border-border bg-card">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary shrink-0">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm tracking-tight">InterviewAI</span>
        </Link>

        {/* Center content */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Get started in 3 steps
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight mb-10">
            Your next offer<br />
            <span className="text-primary">starts here.</span>
          </h2>

          <div className="space-y-5 mb-12">
            {steps.map(({ num, label }) => (
              <div key={num} className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded border border-primary/30 bg-primary/10 shrink-0">
                  <span className="text-xs font-black text-primary tabular-nums">{num}</span>
                </div>
                <span className="text-sm font-medium">{label}</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 ml-auto" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-background/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold">Free to start</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No credit card required. Full access on your first session.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold">Private & secure</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your sessions and answers are never shared.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom stat */}
        <div className="flex items-baseline gap-3 border-t border-border pt-6">
          <span className="text-3xl font-black tabular-nums text-primary">2,400+</span>
          <span className="text-sm text-muted-foreground">mock interviews completed this month</span>
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary shrink-0">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm tracking-tight">InterviewAI</span>
        </Link>

        <div className="w-full max-w-sm">
          <div className="mb-6">
            <h1 className="text-xl font-extrabold tracking-tight mb-1">Create account</h1>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:underline underline-offset-2 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <SignUp appearance={clerkAppearance} />
        </div>
      </div>
    </div>
  );
}
