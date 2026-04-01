"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { urlApi } from "@/lib/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link01Icon, Tag01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

interface UrlShortenerFormProps {
  onSuccess: () => void;
}

export function UrlShortenerForm({ onSuccess }: UrlShortenerFormProps) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await urlApi.shorten({ originalUrl, shortCode: shortCode || undefined });
      setOriginalUrl("");
      setShortCode("");
      onSuccess();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to shorten URL. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-zinc-900/40 p-6 backdrop-blur-sm shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mb-6">
        <h2 className="text-lg font-bold tracking-tight text-white">Create link</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste a long URL to instantly track and shorten it.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-primary/0 opacity-0 transition group-focus-within:opacity-100 blur-sm" />
          <div className="relative">
            <HugeiconsIcon
              icon={Link01Icon}
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
            />
            <Input
              placeholder="https://your-very-long-url.com/..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="pl-11 h-12 text-sm bg-zinc-950/80 border-white/10 focus-visible:ring-primary focus-visible:border-transparent rounded-xl"
              required
            />
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-primary/0 opacity-0 transition group-focus-within:opacity-100 blur-sm" />
          <div className="relative">
            <HugeiconsIcon
              icon={Tag01Icon}
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
            />
            <Input
              placeholder="Custom slug (optional)"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              className="pl-11 h-12 font-mono text-sm bg-zinc-950/80 border-white/10 focus-visible:ring-primary focus-visible:border-transparent rounded-xl"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="mt-2 h-12 gap-2 text-sm font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all w-full"
          disabled={isLoading || !originalUrl}
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Shortening...
            </>
          ) : (
            <>
              Shorten URL
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
