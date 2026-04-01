"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { urlApi } from "@/lib/api";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CopyIcon,
  Delete02Icon,
  ChartBarLineIcon,
  Link01Icon,
  Tick02Icon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";

interface UrlCardProps {
  url: {
    id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: string;
  };
  onDelete: () => void;
}

export function UrlCard({ url, onDelete }: UrlCardProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const shortUrl = `${process.env.NEXT_PUBLIC_SHORT_URL_BASE || "http://localhost:3000"}/api/v1/url/${url.shortCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this link? This cannot be undone.")) return;
    setIsDeleting(true);
    try {
      await urlApi.delete(url.id);
      onDelete();
    } catch (err) {
      console.error("Failed to delete:", err);
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(url.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group relative flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 px-5 py-4 transition-all hover:bg-zinc-900/60 hover:border-white/10 hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm overflow-hidden text-sm">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="flex flex-1 items-center gap-4 min-w-0">
        {/* Icon */}
        <div className="hidden sm:flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 shadow-inner transition-colors group-hover:bg-primary/10 group-hover:border-primary/20">
          <HugeiconsIcon icon={Link01Icon} className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>

        {/* Main info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-base font-bold text-white tracking-tight border border-white/10 bg-black/50 px-2 py-0.5 rounded-md">
              /{url.shortCode}
            </span>
            <button
              onClick={handleCopy}
              title="Copy short link"
              className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-all ${
                isCopying 
                  ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                  : "bg-white/5 text-muted-foreground border border-transparent hover:bg-white/10 hover:text-white"
              }`}
            >
              {isCopying ? (
                <>
                  <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-green-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={CopyIcon} className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            {url.originalUrl}
          </p>
        </div>
      </div>

      {/* Stats & actions right aligned */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden shrink-0 flex-col items-end sm:flex mr-4 gap-1">
          <div className="flex items-center gap-1.5 text-white/90">
            <HugeiconsIcon icon={ChartBarLineIcon} className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-bold tabular-nums">{url.clicks.toLocaleString()}</span>
            <span className="text-xs font-medium text-muted-foreground ml-0.5">clicks</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <HugeiconsIcon icon={Calendar01Icon} className="h-3 w-3" />
            <span className="text-[11px] font-medium">{formattedDate}</span>
          </div>
        </div>

        {/* Mobile stats */}
        <div className="flex sm:hidden flex-col items-end gap-1">
          <span className="text-sm font-bold tabular-nums text-white/90">{url.clicks} <span className="text-xs font-normal text-muted-foreground">clicks</span></span>
        </div>

        {/* Delete */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isDeleting}
          className="h-9 w-9 shrink-0 rounded-full text-muted-foreground opacity-50 transition-all hover:bg-red-500/10 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
          title="Delete link"
        >
          <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
