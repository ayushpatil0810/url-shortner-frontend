"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { authApi } from "@/lib/api";
import {
  Link01Icon,
  ZapIcon,
  ChartBarLineIcon,
  ShieldCheck,
  ArrowRight01Icon,
  Github01Icon,
  Tag01Icon,
  Mouse01Icon,
} from "@hugeicons/core-free-icons";

const GITHUB_REPO = "https://github.com/ayushpatil0810/short-url";
const GITHUB_PROFILE = "https://github.com/ayushpatil0810";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authApi.me();
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setIsAuthLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navbar with glassmorphism effect */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-2.5 transition-transform hover:scale-105">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-white to-white/70 shadow-lg shadow-white/20 dark:from-white dark:to-white/80">
              <HugeiconsIcon icon={Link01Icon} className="h-4 w-4 text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              ShortLink
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <HugeiconsIcon icon={Github01Icon} className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>
            <div className="h-4 w-px bg-border hidden sm:block" />
            
            <div className="flex items-center gap-2 min-w-[120px] justify-end">
              {isAuthLoading ? (
                <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
              ) : isLoggedIn ? (
                <Link href="/dashboard">
                  <Button size="sm" className="h-9 px-4 text-sm font-semibold rounded-full shadow-lg hover:shadow-primary/20 transition-all">
                    Dashboard
                    <HugeiconsIcon icon={ArrowRight01Icon} className="ml-1.5 h-4 w-4 flex-shrink-0" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth">
                    <Button variant="ghost" size="sm" className="hidden sm:flex text-sm font-medium">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button size="sm" className="h-9 px-4 text-sm font-semibold rounded-full shadow-lg hover:shadow-primary/20 transition-all">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden w-full">
          {/* Enhanced background effects */}
          <div className="absolute inset-0 dot-grid opacity-50 mask-image-b" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-50"
          />

          <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-28 md:px-8 md:pb-40 md:pt-40">
            {/* Subtle floating badge */}
            <div className="animate-fade-up mb-10 flex justify-center">
              <Link href={GITHUB_REPO} target="_blank">
                <span className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                  v1.0 is live and open-source
                  <HugeiconsIcon icon={ArrowRight01Icon} className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>

            <div className="animate-fade-up-delay-1 mx-auto max-w-4xl text-center space-y-8">
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Shorten links. <br className="hidden sm:block" />
                <span className="gradient-text italic pr-2">Amplify reach.</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground">
                The modern, lightning-fast URL shortener. Clean up your unwieldy links and track them in real-time.
              </p>
            </div>

            <div className="animate-fade-up-delay-2 mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {isAuthLoading ? (
                <div className="w-full sm:w-[240px] h-14 animate-pulse rounded-full bg-white/10" />
              ) : isLoggedIn ? (
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 rounded-full px-8 text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                    Go to Dashboard
                    <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/auth" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 rounded-full px-8 text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                    Start Shortening Free
                    <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              
              <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 rounded-full px-8 text-base bg-background/50 backdrop-blur-sm border-white/10 hover:bg-white/5 transition-all">
                  <HugeiconsIcon icon={Github01Icon} className="mr-2 h-5 w-5" />
                  View Repository
                </Button>
              </a>
            </div>

            {/* Premium App Preview / Fake Browser */}
            <div className="animate-fade-up-delay-3 mx-auto mt-24 max-w-3xl perspective-1000">
              <div className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 p-2 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:rotate-x-0 rotate-x-2">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative rounded-xl border border-white/5 bg-black overflow-hidden shadow-inner">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-900/80 px-4 py-3 backdrop-blur-md">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                      <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="mx-auto flex w-1/2 items-center justify-center rounded-md bg-black/50 py-1.5 px-3 text-xs text-muted-foreground border border-white/5">
                      <HugeiconsIcon icon={Link01Icon} className="mr-1.5 h-3 w-3 opacity-50" />
                      app.shortlink.com
                    </div>
                  </div>
                  {/* Browser Body */}
                  <div className="flex items-center gap-4 bg-zinc-950/80 p-6 md:p-10">
                    <div className="flex-1 rounded-xl border border-white/10 bg-zinc-900/80 p-4 shadow-lg flex items-center gap-3">
                      <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                        <HugeiconsIcon icon={Link01Icon} className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-white">The Ultimate Guide to Next.js Performance Optimization</p>
                        <p className="truncate text-xs text-muted-foreground mt-0.5">https://very-long-domain.com/article/nextjs-perf...</p>
                      </div>
                    </div>
                    <HugeiconsIcon icon={ArrowRight01Icon} className="hidden sm:block h-6 w-6 text-primary flex-shrink-0" />
                    <div className="shrink-0 rounded-xl border border-primary/20 bg-primary/5 p-4 shadow-[0_0_20px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center">
                      <p className="text-xs text-primary/70 font-medium mb-1 uppercase tracking-wider">Shortened</p>
                      <span className="font-mono text-base font-bold text-white bg-white/10 px-3 py-1 rounded-md">
                        shrt.lk/nxT2p
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-muted-foreground opacity-50">
              <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
              <HugeiconsIcon icon={Mouse01Icon} className="h-5 w-5" />
            </div>
          </div>
        </section>

        {/* Features Grids - Beautiful Cards */}
        <section className="relative border-t border-white/5 bg-zinc-950 py-32 overflow-hidden">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
          
          <div className="relative mx-auto max-w-6xl px-6 md:px-8">
            <div className="mb-20 max-w-2xl text-left sm:text-center mx-auto">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl mb-6">
                Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Speed</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Scale</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We've stripped away the bloat to give you a tool that does one thing perfectly. Fast redirects, deep insights, and a seamless developer experience.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: ZapIcon,
                  title: "Lightning Redirects",
                  desc: "Edge-optimized infrastructure ensures your links resolve in under 50ms globally. Zero latency for your users.",
                  color: "from-amber-400 to-orange-500",
                  bg: "bg-amber-500/10",
                  iconColor: "text-amber-500",
                },
                {
                  icon: ChartBarLineIcon,
                  title: "Insightful Analytics",
                  desc: "Track every click with pinpoint accuracy. Simple, intuitive numbers without the complex dashboard bloat.",
                  color: "from-blue-400 to-indigo-500",
                  bg: "bg-blue-500/10",
                  iconColor: "text-blue-500",
                },
                {
                  icon: Tag01Icon,
                  title: "Custom Slugs",
                  desc: "Maintain your brand identity. Choose personalized short codes to make your links highly recognizable.",
                  color: "from-emerald-400 to-teal-500",
                  bg: "bg-emerald-500/10",
                  iconColor: "text-emerald-500",
                },
              ].map((f, i) => (
                <div
                  key={f.title}
                  className="group relative rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-sm transition-all hover:bg-zinc-900/80 hover:border-white/10 hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${f.color} blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bg} border border-white/5`}>
                    <HugeiconsIcon icon={f.icon} className={`h-6 w-6 ${f.iconColor}`} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Premium Style */}
        <section className="border-t border-white/5 bg-background py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/50" />
          
          <div className="relative mx-auto max-w-5xl px-6 md:px-8">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 p-10 md:p-20 text-center shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute left-1/2 top-1/2 -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px]" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                  <HugeiconsIcon icon={ShieldCheck} className="h-8 w-8 text-foreground" />
                </div>
                <h2 className="mb-6 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  Ready to take control?
                </h2>
                <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
                  Join thousands of developers using ShortLink to manage and track their URLs. Free forever, open-source, and lightning fast.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  {isAuthLoading ? (
                    <div className="w-full sm:w-[240px] h-14 animate-pulse rounded-full bg-white/10" />
                  ) : isLoggedIn ? (
                    <Link href="/dashboard" className="w-full sm:w-auto">
                      <Button size="lg" className="w-full h-14 rounded-full px-10 text-base font-semibold shadow-xl hover:scale-105 transition-transform">
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth" className="w-full sm:w-auto">
                      <Button size="lg" className="w-full h-14 rounded-full px-10 text-base font-semibold shadow-xl hover:scale-105 transition-transform">
                        Create free account
                      </Button>
                    </Link>
                  )}
                  <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full h-14 rounded-full px-8 text-base bg-transparent border-white/20 hover:bg-white/5 transition-colors">
                      <HugeiconsIcon icon={Github01Icon} className="mr-2 h-5 w-5" />
                      Star on GitHub
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Minimalist */}
      <footer className="border-t border-white/5 bg-zinc-950 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row px-6 md:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-white">
              <HugeiconsIcon icon={Link01Icon} className="h-4 w-4 text-black" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">ShortLink</span>
          </div>

          <div className="flex text-sm text-muted-foreground">
            <p>
              Designed & built by{" "}
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-white transition-colors underline decoration-white/20 underline-offset-4 hover:decoration-white"
              >
                Ayush Patil
              </a>
              . Open Source on GitHub.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/20"
            >
              <HugeiconsIcon icon={Github01Icon} className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

