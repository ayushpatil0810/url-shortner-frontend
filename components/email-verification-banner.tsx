"use client";

import { useState } from "react";
import { authApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, CancelCircleIcon } from "@hugeicons/core-free-icons";
import toast from "react-hot-toast";

interface EmailVerificationBannerProps {
  userEmail?: string;
}

export function EmailVerificationBanner({
  userEmail,
}: EmailVerificationBannerProps) {
  const [isResending, setIsResending] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleResendEmail = async () => {
    if (!userEmail) {
      toast.error("Email address not found");
      return;
    }

    setIsResending(true);
    try {
      await authApi.resendVerification(userEmail);
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to resend verification email. Please try again later."
      );
    } finally {
      setIsResending(false);
    }
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className="relative border-b border-amber-500/20 bg-amber-500/10 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 shadow-inner">
              <HugeiconsIcon
                icon={Mail01Icon}
                className="h-4 w-4 shrink-0 text-amber-500"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-500">
                Email Not Verified
              </p>
              <p className="text-xs text-amber-500/70 font-medium">
                Please verify your email address to unlock all features.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleResendEmail}
              disabled={isResending}
              className="border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-semibold h-8"
            >
              {isResending ? "Sending..." : "Resend Email"}
            </Button>
            <button
              onClick={() => setIsDismissed(true)}
              className="rounded-full p-1 transition-colors hover:bg-amber-500/20"
              aria-label="Dismiss"
            >
              <HugeiconsIcon
                icon={CancelCircleIcon}
                className="h-5 w-5 text-amber-500/60 hover:text-amber-500"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
