"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { UrlShortenerForm } from "@/components/url-shortener-form";
import { UrlCard } from "@/components/url-card";
import { EmailVerificationBanner } from "@/components/email-verification-banner";
import { urlApi, authApi } from "@/lib/api";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChartBarLineIcon,
  Link01Icon,
  ZapIcon,
  Mouse01Icon,
} from "@hugeicons/core-free-icons";

export default function DashboardPage() {
  const [urls, setUrls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const fetchUrls = useCallback(async () => {
    try {
      const response = await urlApi.list();
      const payload = response.data?.data;
      const normalizedUrls = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.urls)
          ? payload.urls
          : [];
      setUrls(normalizedUrls);
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
      setUrls([]);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await authApi.me();
      setUser(response.data.data);
      fetchUrls();
    } catch (err) {
      console.error("Auth check failed:", err);
      router.push("/auth");
    } finally {
      setIsLoading(false);
    }
  }, [fetchUrls, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm font-medium tracking-tight">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const totalClicks = urls.reduce((acc, curr) => acc + (curr.clicks || 0), 0);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground relative selection:bg-primary selection:text-primary-foreground">
      {/* Background Ambience */}
      <div className="absolute inset-0 dot-grid opacity-[0.15] mix-blend-overlay pointer-events-none" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-gradient-to-b from-primary/5 to-transparent blur-[100px] pointer-events-none" />

      <Navbar />

      {user && !user.isEmailVerified && (
        <EmailVerificationBanner userEmail={user.email} />
      )}

      <main className="relative mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-8">
        {/* Page header */}
        <div className="mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-semibold text-muted-foreground mb-4">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
            Dashboard
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {user?.username ? `Welcome back, ${user.username}` : "Your Links"}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Manage your shortened URLs and track live analytics here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 animate-fade-up-delay-1">
          {/* Left column */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-24 self-start">
            <UrlShortenerForm onSuccess={fetchUrls} />

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-5 backdrop-blur-sm transition-all hover:bg-zinc-900/60 hover:border-white/10">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-500/10 blur-xl transition-opacity group-hover:opacity-100 opacity-50" />
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                  <HugeiconsIcon icon={Link01Icon} className="h-4 w-4 text-amber-500" />
                  Total Links
                </div>
                <span className="text-3xl font-bold tabular-nums text-white">
                  {urls.length}
                </span>
              </div>
              
              <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-5 backdrop-blur-sm transition-all hover:bg-zinc-900/60 hover:border-white/10">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/10 blur-xl transition-opacity group-hover:opacity-100 opacity-50" />
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                  <HugeiconsIcon icon={ChartBarLineIcon} className="h-4 w-4 text-blue-500" />
                  Total Clicks
                </div>
                <span className="text-3xl font-bold tabular-nums text-white">
                  {totalClicks}
                </span>
              </div>
            </div>

            {/* Tip */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
              <div className="relative z-10">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-500">
                  <HugeiconsIcon icon={ZapIcon} className="h-4 w-4" />
                  Pro Tip
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Use a <span className="font-mono font-medium text-emerald-400">custom slug</span> to make links memorable — great for campaigns, portfolios, or sharing on social media.
                </p>
              </div>
            </div>
          </div>

          {/* Right column — link list */}
          <div className="lg:col-span-8 flex flex-col h-full">
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-white/5 bg-zinc-900/20 px-5 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-bold tracking-tight">Active Links</h2>
                {urls.length > 0 && (
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-bold text-white">
                    {urls.length}
                  </span>
                )}
              </div>
              <span className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                Newest first
              </span>
            </div>

            {urls.length > 0 ? (
              <div className="flex flex-col gap-3">
                {urls.map((url) => (
                  <UrlCard key={url.id} url={url} onDelete={fetchUrls} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-zinc-900/20 py-32 backdrop-blur-sm">
                <div className="mb-4 rounded-2xl border border-white/5 bg-zinc-900 p-5 shadow-inner">
                  <HugeiconsIcon
                    icon={Link01Icon}
                    className="h-8 w-8 text-muted-foreground/30"
                  />
                </div>
                <p className="text-lg font-semibold text-foreground">A clean slate</p>
                <p className="mt-2 text-sm text-muted-foreground max-w-[250px] text-center">
                  Shorten your first URL using the form on the left to start tracking limits.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
