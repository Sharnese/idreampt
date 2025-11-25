// src/pages/SignUp.tsx
import { useState, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function SignUp() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  // plan from query: "trial" or "paid" (default to trial)
  const initialPlan = searchParams.get("plan") === "paid" ? "paid" : "trial";

  const [plan] = useState<"trial" | "paid">(initialPlan);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("Something went wrong creating your account.");
      }

      toast({
        title: "Account created",
        description: "Next, choose your plan and add your payment details.",
      });

      // Send them to subscription selection with the chosen plan
      navigate(`/subscribe?plan=${plan}`);
    } catch (err: any) {
      toast({
        title: "Sign up failed",
        description: err.message ?? "Please try again.",
        variant: "destructive",
      });
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
            ? "Start your 7-day free trial. You’ll add a card on the next step and be billed $4.99/month after your trial ends."
            : "Jump right in with the full experience for $4.99/month. You’ll add a card on the next step."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              placeholder="What should we call you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
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
