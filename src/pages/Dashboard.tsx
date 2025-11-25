// src/pages/Dashboard.tsx
import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Tab = "chat" | "history" | "profile";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("chat");
  const [loadingUser, setLoadingUser] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Load current user
  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        navigate("/signin");
        return;
      }

      setUserEmail(data.user.email ?? null);
      setDisplayName(
        (data.user.user_metadata as any)?.display_name ?? ""
      );
      setLoadingUser(false);
    };

    loadUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { display_name: displayName },
      });
      if (error) throw error;
      setSuccessMsg("Profile updated.");
    } catch (err: any) {
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

  const handleDeactivate = () => {
    alert(
      "Deactivation flow goes here (e.g., flag account in your profiles table)."
    );
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
        {/* CHAT TAB – just link out to the existing full-page chat */}
        {tab === "chat" && (
          <section className="mt-3 rounded-2xl border border-white/10 bg-black/40 p-4 md:p-6">
            <h1 className="text-base md:text-lg font-semibold mb-2">
              🌙 Dream Chat
            </h1>
            <p className="text-[11px] md:text-xs text-lavender/80 mb-4">
              Open your AI-powered dream interpreter to analyze a new dream.
            </p>
            <Button
              onClick={() => navigate("/chat")}
              className="mt-1"
            >
              Open Dream Chat
            </Button>
          </section>
        )}

        {/* HISTORY TAB */}
        {tab === "history" && (
          <section className="mt-3 rounded-2xl border border-white/10 bg-black/40 p-4 md:p-6">
            <h1 className="text-base md:text-lg font-semibold mb-2">
              📜 Dream History & Results
            </h1>
            <p className="text-[11px] md:text-xs text-lavender/80 mb-4">
              Soon, every dream you interpret will be saved here with its
              insight and themes. You’ll be able to scroll back through your
              “night stories” and see patterns in your waking life.
            </p>
            <div className="rounded-2xl border border-dashed border-white/20 bg-black/30 min-h-[40vh] flex items-center justify-center text-xs text-lavender/70 text-center px-6">
              No dream history yet. Once we store each dream in Supabase,
              they’ll appear here with dates, summaries, and key symbols.
            </div>
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
                  This will log you out and mark your account as inactive.
                  Later we can wire this to actually disable your
                  subscription/user.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/70 text-red-300 hover:bg-red-500/10"
                  type="button"
                  onClick={handleDeactivate}
                >
                  Deactivate account
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

