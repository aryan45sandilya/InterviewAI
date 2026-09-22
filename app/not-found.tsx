import Link from "next/link";
import { ArrowLeft, Home, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary mx-auto mb-8">
          <Brain className="h-6 w-6 text-primary-foreground" />
        </div>

        <p className="text-7xl font-extrabold tabular-nums tracking-tight text-foreground mb-4">
          404
        </p>

        <h2 className="text-xl font-semibold mb-3">Page not found</h2>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="sm" className="gap-1.5 w-full sm:w-auto">
              <Home className="h-3.5 w-3.5" />
              Go home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-1.5 w-full sm:w-auto">
              <ArrowLeft className="h-3.5 w-3.5" />
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
