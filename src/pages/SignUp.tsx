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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: name },
        },
      });

      if (error) throw error;

      navigate(`/subscribe?plan=${plan}`);
    } catch (err) {
      console.error("Sign up failed:", err);
      alert("Error signing up. Please try again.");
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
