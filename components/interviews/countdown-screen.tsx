"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Mic, Video, Clock } from "lucide-react";

interface CountdownScreenProps {
  interviewTitle: string;
  totalQuestions: number;
  onComplete: () => void;
}

const TOTAL = 10;

export function CountdownScreen({ interviewTitle, totalQuestions, onComplete }: CountdownScreenProps) {
  const [seconds, setSeconds] = useState(TOTAL);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    // Use setInterval — much more reliable than chained setTimeout
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          setTimeout(() => onCompleteRef.current(), 0);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []); // run once only

  const circumference = 2 * Math.PI * 54;
  const filled = ((TOTAL - seconds) / TOTAL) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-8 text-center px-6 max-w-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <Brain className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-base">InterviewAI</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-1">{interviewTitle}</h1>
          <p className="text-muted-foreground text-sm">
            {totalQuestions} questions · AI will read each question aloud
          </p>
        </div>

        {/* Countdown circle */}
        <div className="relative flex h-36 w-36 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${filled} ${circumference}`}
              className="stroke-primary"
              style={{ transition: "stroke-dasharray 0.9s linear" }}
            />
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black tabular-nums">{seconds}</span>
            <span className="text-xs text-muted-foreground mt-1">seconds</span>
          </div>
        </div>

        <p className="text-lg font-semibold text-muted-foreground">Interview starting soon</p>

        <div className="grid grid-cols-3 gap-4 w-full">
          {[
            { icon: Mic, label: "Allow microphone" },
            { icon: Video, label: "Keep face in frame" },
            { icon: Clock, label: "60s per question" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 rounded-xl border bg-card p-3">
              <Icon className="h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground text-center leading-tight">{label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => onCompleteRef.current()}
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
        >
          Skip countdown
        </button>
      </div>
    </div>
  );
}
