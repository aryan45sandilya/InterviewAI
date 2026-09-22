"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 mx-auto mb-8">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>

        <h2 className="text-xl font-semibold mb-3">Something went wrong</h2>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed max-w-sm mx-auto">
          {error.message || "An unexpected error occurred."}
        </p>

        {error.digest && (
          <p className="text-xs text-muted-foreground font-mono bg-secondary px-3 py-1.5 rounded inline-block mb-8">
            {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Button size="sm" onClick={reset} className="gap-1.5 w-full sm:w-auto">
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-1.5 w-full sm:w-auto">
              <Home className="h-3.5 w-3.5" />
              Go home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
