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
        // Not logged in → send back to landing/signup
        navigate("/signup");
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
    // Placeholder: later you can mark user as deactivated in your profiles table
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
    <div className="min-h-screen bg-gradient-to-b from-crimson via-plum to-cosmic text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-black/20 backdrop-blur p-5 gap-6">
        <div>
          <p className="text-sm font-semibold">
            <span className="text-lavender">i</span>Dreampt
          </p>
          <p className="text-xs text-lavender/80 mt-1">
            Welcome{displayName ? `, ${displayName}` : ""}.
          </p>
          {userEmail && (
            <p className="text-[11px] text-lavender/60 mt-1">{userEmail}</p>
          )}
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <button
            onClick={() => setTab("chat")}
            className={`text-left px-3 py-2 rounded-xl transition ${
              tab === "chat"
                ? "bg-lavender text-cosmic"
                : "hover:bg-white/5 text-lavender/90"
            }`}
          >
            🌙 Dream Chat
          </button>
          <button
            onClick={() => setTab("history")}
            className={`text-left px-3 py-2 rounded-xl transition ${
              tab === "history"
                ? "bg-lavender text-cosmic"
                : "hover:bg-white/5 text-lavender/90"
            }`}
          >
            📜 Dream History
          </button>
          <button
            onClick={() => setTab("profile")}
            className={`text-left px-3 py-2 rounded-xl transition ${
              tab === "profile"
                ? "bg-lavender text-cosmic"
                : "hover:bg-white/5 text-lavender/90"
            }`}
          >
            ⚙️ Profile & Settings
          </button>
        </nav>

        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full border-lavender/70 text-lavender hover:bg-lavender/10"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 p-4 md:p-8">
        <div className="md:hidden mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">
              <span className="text-lavender">i</span>Dreampt Dashboard
            </p>
            {userEmail && (
              <p className="text-[11px] text-lavender/70">{userEmail}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-lavender/70 text-lavender"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>

        {/* Tab selector for mobile */}
        <div className="md:hidden mb-4 flex gap-2 text-xs">
          <button
            onClick={() => setTab("chat")}
            className={`flex-1 px-3 py-2 rounded-full ${
              tab === "chat"
                ? "bg-lavender text-cosmic"
                : "bg-white/10 text-lavender/90"
            }`}
          >
            Dream Chat
          </button>
          <button
            onClick={() => setTab("history")}
            className={`flex-1 px-3 py-2 rounded-full ${
              tab === "history"
                ? "bg-lavender text-cosmic"
                : "bg-white/10 text-lavender/90"
            }`}
          >
            History
          </button>
          <button
            onClick={() => setTab("profile")}
            className={`flex-1 px-3 py-2 rounded-full ${
              tab === "profile"
                ? "bg-lavender text-cosmic"
                : "bg-white/10 text-lavender/90"
            }`}
          >
            Profile
          </button>
        </div>

        {/* Messages */}
        {(errorMsg || successMsg) && (
          <div className="mb-4 text-xs">
            {errorMsg && (
              <p className="text-red-300 mb-1">Error: {errorMsg}</p>
            )}
            {successMsg && (
              <p className="text-emerald-300">{successMsg}</p>
            )}
          </div>
        )}

        {/* CONTENT TABS */}
        {tab === "chat" && (
          <section className="bg-black/20 border border-white/10 rounded-3xl p-4 md:p-6 min-h-[60vh]">
            <h1 className="text-xl font-semibold mb-2">
              🌙 Dream Chat
            </h1>
            <p className="text-xs text-lavender/80 mb-4">
              This is where your AI dream conversation lives. You can later
              embed your existing chat component from `/chat` here.
            </p>
            <div className="rounded-2xl border border-white/10 bg-black/40 h-[50vh] flex items-center justify-center text-xs text-lavender/70">
              Dream chat UI goes here (we’ll swap in your existing /chat
              component).
            </div>
          </section>
        )}

        {tab === "history" && (
          <section className="bg-black/20 border border-white/10 rounded-3xl p-4 md:p-6 min-h-[60vh]">
            <h1 className="text-xl font-semibold mb-2">
              📜 Dream History & Results
            </h1>
            <p className="text-xs text-lavender/80 mb-4">
              Later this will pull from a <code>dreams</code> table in Supabase
              and show your past dreams + interpretations. For now this is a
              placeholder.
            </p>
            <div className="rounded-2xl border border-dashed border-white/20 bg-black/30 h-[50vh] flex items-center justify-center text-xs text-lavender/70">
              No dream history yet. Once we store each dream in Supabase, they’ll
              appear here.
            </div>
          </section>
        )}

        {tab === "profile" && (
          <section className="grid md:grid-cols-2 gap-6">
            {/* Profile info */}
            <div className="bg-black/20 border border-white/10 rounded-3xl p-4 md:p-6">
              <h1 className="text-lg font-semibold mb-3">
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
                    <p className="text-xs text-lavender/80">{userEmail}</p>
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
            <div className="bg-black/20 border border-white/10 rounded-3xl p-4 md:p-6 space-y-6">
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
                  This will log you out and mark your account as inactive. Later
                  we can wire this to actually disable your subscription/user.
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
