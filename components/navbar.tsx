"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";
import { authApi } from "@/lib/api";

export function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 transition-transform hover:scale-105"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-white to-white/70 shadow-lg shadow-white/20 dark:from-white dark:to-white/80">
            <HugeiconsIcon icon={Link01Icon} className="h-4 w-4 text-black" />
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            ShortLink
          </span>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-full px-4 h-9 transition-colors"
        >
          <HugeiconsIcon icon={Logout01Icon} className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </header>
  );
}
