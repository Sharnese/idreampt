// src/pages/SignIn.tsx
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Sign in response:", data, error);

      if (error) {
        setErrorMsg(error.message || "Unable to sign in.");
        return;
      }

      // Signed in → send to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-crimson via-plum to-cosmic flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-background/90 border border-border rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur">
        <h1 className="text-2xl font-semibold mb-2 text-foreground">
          Sign in to iDreampt
        </h1>
        <p className="text-xs text-muted-foreground mb-6">
          Welcome back. Enter your email and password to access your dream
          dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Signing you in..." : "Sign in →"}
          </Button>
        </form>

        {errorMsg && (
          <p className="mt-3 text-xs text-red-400">
            Error: {errorMsg}
          </p>
        )}

        <p className="mt-4 text-xs text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-lavender hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
