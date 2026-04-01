"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, CancelCircleIcon, Loading03Icon } from "@hugeicons/core-free-icons";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link. No token provided.");
        return;
      }
      try {
        const response = await authApi.verifyEmail(token);
        setStatus("success");
        setMessage(response.data?.message || "Email verified successfully!");
        setTimeout(() => { router.push("/auth"); }, 3000);
      } catch (error: any) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Failed to verify email. The link may be invalid or expired.");
      }
    };
    verifyEmail();
  }, [token, router]);

  return (
    <Card className="w-full max-w-md border-border/40 shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
          {status === "loading" && <HugeiconsIcon icon={Loading03Icon} className="h-8 w-8 animate-spin text-primary" />}
          {status === "success" && <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-8 w-8 text-green-500" />}
          {status === "error" && <HugeiconsIcon icon={CancelCircleIcon} className="h-8 w-8 text-destructive" />}
        </div>
        <CardTitle className="text-2xl">
          {status === "loading" && "Verifying Your Email"}
          {status === "success" && "Email Verified!"}
          {status === "error" && "Verification Failed"}
        </CardTitle>
        <CardDescription>
          {status === "loading" && "Please wait while we verify your email address..."}
          {status === "success" && "Your email has been successfully verified."}
          {status === "error" && "We could not verify your email address."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">{message}</p>
        {status === "success" && <div className="rounded-lg bg-green-500/10 p-4 text-center text-sm text-green-600 dark:text-green-400">Redirecting to sign in page in 3 seconds...</div>}
        {status === "error" && (
          <div className="space-y-3">
            <div className="rounded-lg bg-destructive/10 p-4 text-center text-sm text-destructive">If you are having trouble, try requesting a new verification email.</div>
            <Link href="/auth" className="block"><Button className="w-full">Back to Sign In</Button></Link>
          </div>
        )}
        {status === "success" && <Link href="/auth" className="block"><Button className="w-full" variant="outline">Go to Sign In Now</Button></Link>}
      </CardContent>
    </Card>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Suspense fallback={
        <Card className="w-full max-w-md border-border/40 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
              <HugeiconsIcon icon={Loading03Icon} className="h-8 w-8 animate-spin text-primary" />
            </div>
            <CardTitle className="text-2xl">Loading...</CardTitle>
          </CardHeader>
        </Card>
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
