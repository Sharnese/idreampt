import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-crimson via-plum to-cosmic text-white flex flex-col">
      {/* NAVBAR */}
      <header className="w-full max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌙</span>
          <span className="text-2xl font-semibold tracking-wide">
            <span className="text-lavender">i</span>Dreampt
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <button
            onClick={() => scrollTo("how-it-works")}
            className="hover:text-lavender transition-colors"
          >
            How it works
          </button>
          <button
            onClick={() => scrollTo("modalities")}
            className="hover:text-lavender transition-colors"
          >
            What we analyze
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="px-4 py-2 rounded-full border border-lavender/60 hover:bg-lavender/10 transition-colors"
          >
            Sign in
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col">
        <section className="w-full max-w-6xl mx-auto px-4 pt-10 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-medium bg-white/10 border border-white/10 rounded-full px-3 py-1 mb-5">
              ✨ AI-powered dream interpretation
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Unlock the language of your dreams
              <br />
              <span className="text-lavender">
                to understand your waking life.
              </span>
            </h1>

            <p className="text-sm md:text-base text-lavender/90 max-w-xl mb-6">
              iDreampt blends <strong>psychology, spirituality, astrology</strong>,
              and classic dream symbolism with AI to decode deeper meanings behind
              your dreams—so you can understand your life with more clarity and peace.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 rounded-full text-sm font-semibold bg-lavender text-cosmic shadow-lg shadow-black/40 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Start Free 7-Day Trial →
              </button>

              <button
                onClick={() => navigate("/signin")}
                className="px-5 py-3 rounded-full text-sm border border-white/30 hover:bg-white/10 transition-colors"
              >
                Already have an account?
              </button>
            </div>

            <p className="text-xs text-lavender/80">
              No long-term commitment • Cancel anytime • $4.99/mo after trial
            </p>
          </div>

          {/* RIGHT SIDE — PREVIEW CARD */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute -top-10 -right-6 w-32 h-32 bg-crimson/60 blur-2xl rounded-full opacity-70" />

            <div className="relative bg-orchid/20 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-lavender/20 flex items-center justify-center">
                  🧠
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-lavender/80">
                    Dream Session Preview
                  </p>
                  <p className="text-sm text-lavender">AI + Symbolic Insight</p>
                </div>
              </div>

              {/* Dream text */}
              <div className="bg-cosmic/70 rounded-2xl p-4 border border-white/5 mb-4">
                <p className="text-xs text-lavender/80 mb-1">Your Dream</p>
                <p className="text-sm text-white">
                  “I was walking through a city made of glass, and every step echoed
                  like thunder. The moon kept following me…”
                </p>
              </div>

              {/* AI reflection */}
              <div className="bg-gradient-to-r from-lavender/20 via-orchid/30 to-crimson/20 rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-lavender/80 mb-1">iDreampt’s Insight</p>
                <p className="text-sm text-white mb-2">
                  Glass cities often represent feeling observed or emotionally
                  exposed. The echoing steps suggest that your choices feel louder
                  than intended, while the persistent moon hints at intuition or
                  emotional cycles needing your attention.
                </p>
                <p className="text-xs text-lavender/80">
                  Sources: Psychology • Spirituality • Astrology • Symbolism
                </p>
              </div>

              <p className="mt-4 text-[11px] text-lavender/80 text-center">
                Turn confusing dreams into meaningful guidance in minutes.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="w-full max-w-6xl mx-auto px-4 pb-20">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-2">
            ⭐ How iDreampt Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-sm text-lavender/90">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase text-lavender mb-2">
                1 · Share your dream
              </p>
              <p>
                Describe emotions, people, symbols, and scenes. The more detailed,
                the richer your interpretation becomes.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase text-lavender mb-2">
                2 · Multi-lens analysis
              </p>
              <p>
                iDreampt blends psychology, spirituality, astrology, and traditional
                symbolism to decode the meaning from multiple angles.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase text-lavender mb-2">
                3 · Waking-life insight
              </p>
              <p>
                Receive an interpretation + guided reflections so you can understand
                the message your subconscious is sending.
              </p>
            </div>
          </div>
        </section>

        {/* MODALITIES */}
        <section id="modalities" className="w-full max-w-6xl mx-auto px-4 pb-20">
          <div className="bg-cosmic/60 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur">
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              A Modern Dream Guide with Ancient Roots
            </h3>
            <p className="text-sm text-lavender/90 mb-6 max-w-2xl">
              iDreampt doesn’t give generic interpretations. It cross-references
              multiple wisdom systems to personalize your dream’s message.
            </p>

            <div className="grid md:grid-cols-4 gap-4 text-sm text-lavender/90">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-xs font-semibold uppercase text-lavender mb-1">
                  Psychology
                </p>
                <p>Archetypes, emotions, patterns, and unconscious desires.</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-xs font-semibold uppercase text-lavender mb-1">
                  Spirituality
                </p>
                <p>Symbolic messages, intuition, and energetic meaning.</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-xs font-semibold uppercase text-lavender mb-1">
                  Astrology
                </p>
                <p>Planetary archetypes + lunar emotional cycles.</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-xs font-semibold uppercase text-lavender mb-1">
                  Symbolism
                </p>
                <p>Updated interpretations rooted in global dream traditions.</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
              <p className="text-xs text-lavender/80">
                Your dreams aren’t random—they’re messages. iDreampt helps you read
                them.
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 rounded-full text-sm font-semibold bg-lavender text-cosmic hover:brightness-110 shadow-md shadow-black/40 transition-all"
              >
                Start interpreting my dreams →
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-lavender/80">
          <p>© {new Date().getFullYear()} iDreampt. All rights reserved.</p>

          <div className="flex gap-4">
            <button className="hover:text-lavender transition-colors">Privacy</button>
            <button className="hover:text-lavender transition-colors">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
