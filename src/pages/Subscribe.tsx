import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function Subscribe() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialPlan = searchParams.get("plan") === "paid" ? "paid" : "trial";
  const [plan, setPlan] = useState<"trial" | "paid">(initialPlan);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: {
            plan, // "trial" or "paid"
            successUrl: `${window.location.origin}/chat`,
            cancelUrl: `${window.location.origin}/subscribe?plan=${plan}`,
          },
        }
      );

      if (error) throw error;
      if (!data?.url) throw new Error("Missing checkout URL from server.");

      window.location.href = data.url; // send user to Stripe
    } catch (err) {
      console.error("Checkout error:", err);
      alert("There was a problem starting your checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-crimson via-plum to-cosmic text-white flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-background/90 border border-border rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Choose your iDreampt plan
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              You can cancel anytime. Your card is processed securely by Stripe.
            </p>
          </div>
          <button
            className="text-xs text-lavender hover:underline"
            onClick={() => navigate("/")}
          >
            ← Back to landing
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Trial plan */}
          <button
            type="button"
            onClick={() => setPlan("trial")}
            className={`text-left rounded-2xl border p-4 md:p-5 transition-all ${
              plan === "trial"
                ? "border-lavender bg-lavender/10 shadow-lg shadow-black/30"
                : "border-white/10 bg-white/5 hover:border-lavender/60"
            }`}
          >
            <p className="text-sm font-semibold flex items-center gap-2 mb-1">
              7-Day Free Trial
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-lavender text-cosmic uppercase tracking-wide">
                Most popular
              </span>
            </p>
            <p className="text-lg font-bold">Free for 7 days</p>
            <p className="text-xs text-lavender/90 mt-1">
              Then <strong>$4.99/month</strong>, billed monthly.
            </p>
            <ul className="mt-3 text-xs text-lavender/90 space-y-1">
              <li>• Unlimited dream interpretations during trial</li>
              <li>• Full history and saved results</li>
              <li>• Cancel anytime before trial ends</li>
            </ul>
          </button>

          {/* Paid plan */}
          <button
            type="button"
            onClick={() => setPlan("paid")}
            className={`text-left rounded-2xl border p-4 md:p-5 transition-all ${
              plan === "paid"
                ? "border-lavender bg-lavender/10 shadow-lg shadow-black/30"
                : "border-white/10 bg-white/5 hover:border-lavender/60"
            }`}
          >
            <p className="text-sm font-semibold mb-1">Start for $4.99</p>
            <p className="text-lg font-bold">$4.99 / month</p>
            <p className="text-xs text-lavender/90 mt-1">
              Billed today. No trial period.
            </p>
            <ul className="mt-3 text-xs text-lavender/90 space-y-1">
              <li>• Unlimited dream interpretations</li>
              <li>• Priority processing & insights</li>
              <li>• Pause or cancel anytime</li>
            </ul>
          </button>
        </div>

        <Button
          className="w-full"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading
            ? "Starting checkout..."
            : plan === "trial"
            ? "Continue with 7-day free trial →"
            : "Continue with $4.99/month →"}
        </Button>

        <p className="mt-3 text-[11px] text-muted-foreground text-center">
          By continuing, you agree to iDreampt’s Terms and Privacy Policy. You’ll
          be redirected to Stripe to securely enter your payment details.
        </p>
      </div>
    </div>
  );
}
