import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "InterviewAI — AI Mock Interview Platform",
    template: "%s | InterviewAI",
  },
  description:
    "Practice technical and behavioral interviews with AI. Get real-time feedback, emotion analysis, and personalized improvement plans.",
  keywords: [
    "mock interview",
    "AI interview",
    "interview preparation",
    "technical interview",
    "coding interview",
  ],
  authors: [{ name: "Aryan Sandilya" }],
  creator: "InterviewAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "InterviewAI — AI Mock Interview Platform",
    description: "Practice interviews with AI. Get real-time feedback.",
    siteName: "InterviewAI",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#100f0e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <html lang="en" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            richColors
            position="top-right"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--card-foreground))",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );

  if (!publishableKey) return content;
  return <ClerkProvider publishableKey={publishableKey}>{content}</ClerkProvider>;
}
