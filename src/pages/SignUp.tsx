import { useState, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialPlan = searchParams.get("plan") === "paid" ? "paid" : "trial";

  const [plan] = useState<"trial" | "paid">(initialPlan);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      console.log("Signing up with:", { email, password, plan });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: name },
        },
      });

      console.log("Supabase signUp response:", { data, error });

      if (error) {
        setErrorMsg(error.message || "Unknown error from Supabase.");
        return;
      }

      if (!data?.user) {
        setErrorMsg("No user returned from Supabase. Check auth settings.");
        return;
      }

      setSuccessMsg("Account created! Redirecting to subscription…");

      // small delay so they can see the message
      setTimeout(() => {
        navigate(`/subscribe?plan=${plan}`);
      }, 800);
    } catch (err: any) {
      console.error("Sign up failed:", err);
      setErrorMsg(err?.message || "Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-crimson via-plum to-cosmic flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-background/90 border border-border rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur">
        <h1 className="text-2xl font-semibold mb-2 text-foreground">
          Create your iDreampt account
        </h1>

        <p className="text-xs text-muted-foreground mb-6">
          {plan === "trial"
            ? "Start your 7-day free trial. You'll add a card on the next step and be billed $4.99/month afterward."
            : "Continue to checkout to activate your $4.99/month plan."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading
              ? "Creating your account..."
              : plan === "trial"
              ? "Continue to free trial →"
              : "Continue to checkout →"}
          </Button>
        </form>

        {/* Debug messages */}
        {errorMsg && (
          <p className="mt-3 text-xs text-red-500">
            Error: {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="mt-3 text-xs text-emerald-400">
            {successMsg}
          </p>
        )}

        <p className="mt-4 text-xs text-muted-foreground text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="text-lavender hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
