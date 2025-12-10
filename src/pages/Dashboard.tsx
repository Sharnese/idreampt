// src/pages/Dashboard.tsx
import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Tab = "chat" | "history" | "profile";

type DreamRow = {
  id: string;
  dream_text: string;
  interpretation: string | null;
  created_at: string;
};

/** Ensure there is a profile row for this user */
async function ensureProfile(userId: string, email?: string | null) {
  if (!userId) return;

  const { error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: userId,
        email: email ?? null,
      },
      { onConflict: "id" }
    );

  if (error) {
    console.error("Error ensuring profile:", error);
  }
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("chat");

  const [loadingUser, setLoadingUser] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");

  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // History state
  const [dreams, setDreams] = useState<DreamRow[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Deactivate state
  const [deactivating, setDeactivating] = useState(false);

  const fetchDreamHistory = async (uid: string) => {
    setHistoryLoading(true);
    setHistoryError(null);

    const { data, error } = await supabase
      .from("dreams")
      .select("id, dream_text, interpretation, created_at")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading dream history:", error);
      setHistoryError("Could not load dream history.");
      setDreams([]);
    } else {
      setDreams(data || []);
    }

    setHistoryLoading(false);
  };

  // Load current user + ensure profile + load profile + history
  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        navigate("/signin");
        return;
      }

      const user = data.user;
      setUserEmail(user.email ?? null);
      setUserId(user.id);

      // Ensure profile
      await ensureProfile(user.id, user.email);

      // Load profile display_name
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Error loading profile:", profileError);
      } else if (profile?.display_name) {
        setDisplayName(profile.display_name);
      } else {
        setDisplayName("");
      }

      // Load dream history
      await fetchDreamHistory(user.id);

      setLoadingUser(false);
    };

    loadUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // Save profile info INTO profiles table
  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError || !data.user) {
        throw new Error("Not authenticated");
      }

      const user = data.user;

      const { error } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email ?? null,
          display_name: displayName,
        },
        { onConflict: "id" }
      );

      if (error) throw error;

      setSuccessMsg("Profile updated.");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setErrorMsg(err?.message ?? "Could not update profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    setPasswordSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      setSuccessMsg("Password updated.");
      setNewPassword("");
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Could not change password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  // Deactivate + cancel subscription
  const handleDeactivate = async () => {
    const confirmDeactivate = window.confirm(
      "Are you sure you want to deactivate your account? This will cancel your subscription and log you out."
    );
    if (!confirmDeactivate) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setDeactivating(true);

    try {
      // Get current user
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError || !data.user) {
        throw new Error("You must be logged in to deactivate your account.");
      }

      const user = data.user;

      // 1) Cancel subscription via Edge Function (safe even if no sub)
      const { data: cancelData, error: cancelError } =
        await supabase.functions.invoke("cancel-subscription");

      if (cancelError) {
        console.error("Cancel subscription error:", cancelError);
        throw new Error("Could not cancel your subscription.");
      }
      if (cancelData?.error) {
        console.error("Cancel subscription error:", cancelData.error);
        throw new Error("Could not cancel your subscription.");
      }

      // 2) Mark profile as inactive
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          is_active: false,
          deactivated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) {
        console.error("Error deactivating profile:", profileError);
        throw new Error("Could not deactivate your profile.");
      }

      // 3) Success + sign them out
      setSuccessMsg("Your subscription is canceled and your account is deactivated.");
      await supabase.auth.signOut();
      navigate("/"); // or "/signin"
    } catch (err: any) {
      console.error("Deactivation error:", err);
      setErrorMsg(err?.message ?? "Something went wrong deactivating account.");
    } finally {
      setDeactivating(false);
    }
  };

  const handleCopyDream = async (dream: DreamRow) => {
    const text = `Dream (${new Date(dream.created_at).toLocaleString()}):\n\n${dream.dream_text}\n\nInterpretation:\n${dream.interpretation ?? ""}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setSuccessMsg("Dream copied to clipboard.");
      } else {
        alert("Copy not supported in this browser.");
      }
    } catch (err) {
      console.error("Copy failed:", err);
      setErrorMsg("Could not copy dream.");
    }
  };

  const handleShareDream = async (dream: DreamRow) => {
    const text = `Dream (${new Date(dream.created_at).toLocaleString()}):\n\n${dream.dream_text}\n\nInterpretation:\n${dream.interpretation ?? ""}`;

    // @ts-ignore
    if (navigator.share) {
      try {
        // @ts-ignore
        await navigator.share({
          title: "My dream from iDreampt",
          text,
        });
      } catch (err) {
        if ((err as any)?.name !== "AbortError") {
          console.error("Share failed:", err);
          setErrorMsg("Could not share dream.");
        }
      }
    } else {
      // Fallback to copy
      await handleCopyDream(dream);
    }
  };

  const handleDeleteDream = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dream?")) return;

    setDeletingId(id);
    setHistoryError(null);

    try {
      const { error } = await supabase.from("dreams").delete().eq("id", id);
      if (error) throw error;

      setDreams((prev) => prev.filter((d) => d.id !== id));
      if (expandedId === id) {
        setExpandedId(null);
      }
    } catch (err) {
      console.error("Error deleting dream:", err);
      setHistoryError("Could not delete dream.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-crimson via-plum to-cosmic flex items-center justify-center text-white">
        <p>Loading your dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-crimson via-plum to-cosmic text-white flex flex-col">
      {/* Top bar */}
      <header className="w-full px-4 py-3 md:px-8 flex items-center justify-between gap-3 bg-black/30 backdrop-blur border-b border-white/10">
        <div>
          <p className="text-sm font-semibold">
            <span className="text-lavender">i</span>Dreampt Dashboard
          </p>
          <p className="text-xs text-lavender/80">
            Welcome{displayName ? `, ${displayName}` : ""}.
          </p>
          {userEmail && (
            <p className="text-[11px] text-lavender/60 mt-0.5">
              {userEmail}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-lavender/70 text-lavender hover:bg-lavender/10"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </header>

      {/* Tabs */}
      <div className="w-full max-w-5xl mx-auto px-3 md:px-6 pt-3">
        <div className="flex gap-2 mb-3 overflow-x-auto text-xs md:text-sm">
          <button
            onClick={() => setTab("chat")}
            className={`flex-1 min-w-[90px] px-3 py-2 rounded-full transition ${
              tab === "chat"
                ? "bg-lavender text-cosmic font-semibold"
                : "bg-black/40 text-lavender/90 hover:bg-black/60"
            }`}
          >
            🌙 Dream Chat
          </button>
          <button
            onClick={() => setTab("history")}
            className={`flex-1 min-w-[90px] px-3 py-2 rounded-full transition ${
              tab === "history"
                ? "bg-lavender text-cosmic font-semibold"
                : "bg-black/40 text-lavender/90 hover:bg-black/60"
            }`}
          >
            📜 History
          </button>
          <button
            onClick={() => setTab("profile")}
            className={`flex-1 min-w-[90px] px-3 py-2 rounded-full transition ${
              tab === "profile"
                ? "bg-lavender text-cosmic font-semibold"
                : "bg-black/40 text-lavender/90 hover:bg-black/60"
            }`}
          >
            ⚙️ Profile
          </button>
        </div>

        {(errorMsg || successMsg) && (
          <div className="mb-3 text-xs">
            {errorMsg && (
              <p className="text-red-300 mb-1">Error: {errorMsg}</p>
            )}
            {successMsg && (
              <p className="text-emerald-300">{successMsg}</p>
            )}
          </div>
        )}
      </div>

      {/* Main content area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 md:px-6 pb-6">
        {/* CHAT TAB – still linking to /chat for now */}
        {tab === "chat" && (
          <section className="mt-3 rounded-2xl border border-white/10 bg-black/40 p-4 md:p-6">
            <h1 className="text-base md:text-lg font-semibold mb-2">
              🌙 Dream Chat
            </h1>
            <p className="text-[11px] md:text-xs text-lavender/80 mb-4">
              Open your AI-powered dream interpreter to analyze a new dream.
            </p>
            <Button onClick={() => navigate("/chat")} className="mt-1">
              Open Dream Chat
            </Button>
          </section>
        )}

        {/* HISTORY TAB – real data */}
        {tab === "history" && (
          <section className="mt-3 rounded-2xl border border-white/10 bg-black/40 p-4 md:p-6">
            <h1 className="text-base md:text-lg font-semibold mb-2">
              📜 Dream History & Results
            </h1>

            {historyError && (
              <p className="text-xs text-red-300 mb-2">{historyError}</p>
            )}

            {historyLoading ? (
              <p className="text-[11px] md:text-xs text-lavender/80">
                Loading your dream history…
              </p>
            ) : dreams.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/20 bg-black/30 min-h-[40vh] flex items-center justify-center text-xs text-lavender/70 text-center px-6">
                No dream history yet. Interpret a dream and it will show up
                here with a date, your original text, and the AI’s
                interpretation.
              </div>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {dreams.map((d) => {
                  const created = new Date(d.created_at);
                  const dreamPreview =
                    d.dream_text.length > 160
                      ? d.dream_text.slice(0, 160) + "…"
                      : d.dream_text;

                  const interpPreview =
                    d.interpretation && d.interpretation.length > 180
                      ? d.interpretation.slice(0, 180) + "…"
                      : d.interpretation || "";

                  const isExpanded = expandedId === d.id;

                  return (
                    <div
                      key={d.id}
                      className="rounded-xl border border-white/10 bg-black/50 p-3 text-xs md:text-sm"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="text-[10px] text-lavender/70">
                          {created.toLocaleDateString()} •{" "}
                          {created.toLocaleTimeString()}
                        </div>
                        <div className="flex gap-1 flex-wrap justify-end">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-[10px]"
                            onClick={() =>
                              setExpandedId(isExpanded ? null : d.id)
                            }
                          >
                            {isExpanded ? "Collapse" : "Expand"}
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-[10px]"
                            onClick={() => handleCopyDream(d)}
                          >
                            Copy
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-[10px]"
                            onClick={() => handleShareDream(d)}
                          >
                            Share
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-[10px] border-red-400 text-red-300 hover:bg-red-500/10"
                            onClick={() => handleDeleteDream(d.id)}
                            disabled={deletingId === d.id}
                          >
                            {deletingId === d.id ? "Deleting…" : "Delete"}
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      {!isExpanded ? (
                        <div className="space-y-1">
                          <div>
                            <span className="font-semibold text-lavender/90">
                              Dream:
                            </span>{" "}
                            {dreamPreview}
                          </div>
                          {interpPreview && (
                            <div className="text-lavender/90">
                              <span className="font-semibold">
                                Interpretation:
                              </span>{" "}
                              {interpPreview}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2 mt-1">
                          <div>
                            <span className="font-semibold text-lavender/90">
                              Dream:
                            </span>{" "}
                            {d.dream_text}
                          </div>
                          {d.interpretation && (
                            <div className="text-lavender/90">
                              <span className="font-semibold">
                                Interpretation:
                              </span>{" "}
                              {d.interpretation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* PROFILE TAB */}
        {tab === "profile" && (
          <section className="mt-3 grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Profile info */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 md:p-5">
              <h1 className="text-base md:text-lg font-semibold mb-3">
                ⚙️ Profile
              </h1>
              <form onSubmit={handleProfileSave} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="displayName">Display name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="How you want iDreampt to address you"
                  />
                </div>

                {userEmail && (
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <p className="text-xs text-lavender/80">
                      {userEmail}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={profileSaving}
                  className="mt-2"
                >
                  {profileSaving ? "Saving…" : "Save profile"}
                </Button>
              </form>
            </div>

            {/* Password & deactivate */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 md:p-5 space-y-6">
              <div>
                <h2 className="text-sm font-semibold mb-2">
                  Change password
                </h2>
                <form
                  onSubmit={handlePasswordChange}
                  className="space-y-3"
                >
                  <div className="space-y-1">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      minLength={6}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={passwordSaving || !newPassword}
                  >
                    {passwordSaving ? "Updating…" : "Update password"}
                  </Button>
                </form>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h2 className="text-sm font-semibold mb-2 text-red-300">
                  Deactivate account
                </h2>
                <p className="text-[11px] text-lavender/80 mb-3">
                  This will cancel your subscription, mark your account as
                  inactive, and log you out. You can reactivate later by
                  signing back in and subscribing again.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/70 text-red-300 hover:bg-red-500/10"
                  type="button"
                  onClick={handleDeactivate}
                  disabled={deactivating}
                >
                  {deactivating ? "Deactivating…" : "Deactivate account"}
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
