"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authApi } from "@/lib/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link01Icon, Mail01Icon, LockPasswordIcon, UserIcon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setShowVerificationMessage(false);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const email = data.email as string;
    setUserEmail(email);

    try {
      if (isSignIn) {
        await authApi.signin(data);
        toast.success("Welcome back!");
        router.push("/dashboard");
      } else {
        await authApi.signup(data);
        setShowVerificationMessage(true);
        toast.success("Account created! Please check your email to verify.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      
      if (errorMessage.includes("verify your email") || errorMessage.includes("email verification")) {
        toast.error(
          (t) => (
            <span className="flex flex-col gap-2">
              {errorMessage}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={async () => {
                  toast.dismiss(t.id);
                  try {
                    await authApi.resendVerification(email);
                    toast.success("Verification email sent!");
                  } catch (error) {
                    toast.error("Failed to resend verification email");
                  }
                }}
              >
                Resend Email
              </Button>
            </span>
          ),
          { duration: 6000 }
        );
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!userEmail) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await authApi.resendVerification(userEmail);
      toast.success("Verification email sent! Check your inbox.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend email");
    }
  };

  if (showVerificationMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 relative overflow-hidden selection:bg-primary selection:text-primary-foreground">
        <div className="absolute inset-0 dot-grid opacity-[0.15] mix-blend-overlay pointer-events-none" />
        <Card className="w-full max-w-lg border-white/10 bg-zinc-900/60 shadow-2xl backdrop-blur-xl relative z-10">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 shadow-inner">
              <HugeiconsIcon icon={Mail01Icon} className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-white font-bold">Check Your Email</CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-2">
              We have sent a verification link to <span className="font-semibold text-white">{userEmail}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-white/5 bg-black/20 p-5 space-y-3">
              <p className="text-sm font-semibold text-white">Next Steps:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Open your email inbox</li>
                <li>Click the verification link we sent you</li>
                <li>Return here to sign in</li>
              </ol>
            </div>
            
            <div className="text-center text-sm text-muted-foreground pt-2">
              <p>Did not receive the email?</p>
              <Button variant="link" onClick={handleResendVerification} className="h-auto p-0 text-white font-medium hover:text-white/80 transition-colors mt-1">
                Resend verification email
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/auth" className="w-full">
              <Button variant="outline" className="w-full h-12 rounded-full border-white/10 bg-transparent text-white hover:bg-white/5" onClick={() => setShowVerificationMessage(false)}>
                Back to Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 relative overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Background Ambience */}
      <div className="absolute inset-0 dot-grid opacity-[0.15] mix-blend-overlay pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center animate-fade-up">
          <Link href="/" className="group flex flex-col items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-white/70 shadow-lg shadow-white/10">
              <HugeiconsIcon icon={Link01Icon} className="h-8 w-8 text-black" />
            </div>
            <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              ShortLink
            </span>
          </Link>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {isSignIn ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isSignIn ? "Sign in to access your dashboard" : "Join the modern platform for short links"}
            </p>
          </div>
        </div>

        <Card className="border-white/10 bg-zinc-900/40 shadow-2xl backdrop-blur-xl rounded-[2rem] overflow-hidden animate-fade-up-delay-1">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-5">
              {!isSignIn && (
                <div className="space-y-2 group">
                  <Label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Username</Label>
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 transition group-focus-within:opacity-100 blur-sm" />
                    <div className="relative">
                      <HugeiconsIcon icon={UserIcon} className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-white" />
                      <Input id="username" name="username" placeholder="johndoe" className="pl-11 h-12 bg-zinc-950/80 border-white/10 focus-visible:ring-white/30 focus-visible:border-transparent rounded-xl text-sm" required={!isSignIn} />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Email address</Label>
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 transition group-focus-within:opacity-100 blur-sm" />
                  <div className="relative">
                    <HugeiconsIcon icon={Mail01Icon} className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-white" />
                    <Input id="email" name="email" type="email" placeholder="name@example.com" className="pl-11 h-12 bg-zinc-950/80 border-white/10 focus-visible:ring-white/30 focus-visible:border-transparent rounded-xl text-sm" required />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Password</Label>
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 transition group-focus-within:opacity-100 blur-sm" />
                  <div className="relative">
                    <HugeiconsIcon icon={LockPasswordIcon} className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-white" />
                    <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-11 h-12 bg-zinc-950/80 border-white/10 focus-visible:ring-white/30 focus-visible:border-transparent rounded-xl text-sm" required minLength={6} />
                  </div>
                </div>
                {!isSignIn && <p className="text-[11px] text-muted-foreground ml-1 font-medium">Must be at least 6 characters long</p>}
              </div>
            </div>
            
            <div className="mt-8 flex flex-col space-y-4">
              <Button type="submit" className="w-full h-12 gap-2 rounded-full shadow-xl shadow-white/5 hover:shadow-white/10 transition-all font-semibold" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <span>{isSignIn ? "Sign in" : "Create account"}</span>
                    <HugeiconsIcon icon={ArrowRight02Icon} className="h-4 w-4" />
                  </>
                )}
              </Button>
              
              <div className="relative w-full py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
                <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="bg-zinc-900 px-3">{isSignIn ? "New to ShortLink?" : "Already user?"}</span>
                </div>
              </div>
              
              <Button type="button" variant="outline" className="w-full h-12 rounded-full border-white/10 bg-transparent hover:bg-white/5 transition-colors font-semibold text-white/80 hover:text-white" onClick={() => { setIsSignIn(!isSignIn); setShowVerificationMessage(false); }}>
                {isSignIn ? "Create an account" : "Sign in instead"}
              </Button>
            </div>
          </form>
        </Card>

        <div className="text-center animate-fade-up-delay-2">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
