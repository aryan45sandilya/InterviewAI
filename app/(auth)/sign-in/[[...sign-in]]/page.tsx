import { SignIn } from "@clerk/nextjs";
import { Brain, Mic, BarChart3, Code2 } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Sign In" };

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

export default function SignInPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left panel — product info */}
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
            AI Mock Interview Platform
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight mb-6">
            Practice harder.<br />
            <span className="text-primary">Perform better.</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-xs">
            AI mock interviews with voice analysis, emotion tracking,
            and detailed performance reports — all tailored to your target role.
          </p>

          <div className="space-y-4">
            {[
              { icon: Mic, label: "Voice answers with real-time transcription" },
              { icon: BarChart3, label: "Detailed per-question performance scores" },
              { icon: Code2, label: "Live coding rounds with Monaco editor" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 border border-primary/20 shrink-0">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="border-l-2 border-primary/40 pl-4">
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            "The AI-generated questions were surprisingly relevant. Got my offer after 2 weeks of practice."
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2 font-medium">Marcus J. — Full-Stack Dev @ Stripe</p>
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
            <h1 className="text-xl font-extrabold tracking-tight mb-1">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-primary hover:underline underline-offset-2 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <SignIn appearance={clerkAppearance} />
        </div>
      </div>
    </div>
  );
}
