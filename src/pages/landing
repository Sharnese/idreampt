// src/pages/Landing.tsx
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Moon, Star, Brain } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-crimson via-plum to-cosmic text-white flex flex-col">
      {/* Top nav */}
      <header className="w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Moon className="w-7 h-7 text-lavender" />
          <span className="text-2xl font-semibold tracking-wide">
            <span className="text-lavender">i</span>Dreampt
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <button
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-lavender transition-colors"
          >
            How it works
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('modalities');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-lavender transition-colors"
          >
            What we analyze
          </button>
          <button
            onClick={() => navigate('/signin')}
            className="text-sm px-4 py-2 rounded-full border border-lavender/60 hover:bg-lavender/10 transition-colors"
          >
            Sign in
          </button>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col">
        <section className="w-full max-w-6xl mx-auto px-4 pt-8 pb-16 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-medium bg-white/10 border border-white/10 rounded-full px-3 py-1 mb-4">
              <Sparkles className="w-4 h-4 text-lavender" />
              AI-powered dream interpretation
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Unlock the language of your dreams<br />
              <span className="text-lavender">to understand your waking life.</span>
            </h1>

            <p className="text-sm md:text-base text-lavender/90 max-w-xl mb-6">
              iDreampt blends <span className="font-medium">psychology, spirituality, astrology,</span> 
              and classic dream symbolism with AI to decode the deeper meaning behind your dreams—
              so you can see what your subconscious is trying to say.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-lavender text-cosmic shadow-lg shadow-black/40 hover:shadow-xl hover:-translate-y-0.5 transition-transform transition-shadow"
              >
                Start Free 7-Day Trial
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/signin')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Already have an account?
              </button>
            </div>

            <p className="text-xs text-lavender/80">
              No long-term commitment • Cancel anytime • $4.99/month after trial
            </p>
          </div>

          {/* Right: “dream card” preview */}
          <div className="relative">
            {/* floating orb */}
            <div className="absolute -top-10 -right-4 w-28 h-28 bg-crimson/70 blur-2xl rounded-full opacity-70" />

            <div className="relative bg-orchid/20 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-lavender/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-lavender" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-lavender/80">
                    Dream Session Preview
                  </p>
                  <p className="text-sm text-lavender">AI + Human-Symbolic Insight</p>
                </div>
              </div>

              <div className="bg-cosmic/70 rounded-2xl p-4 border border-white/5 mb-4">
                <p className="text-xs text-lavender/80 mb-2">Your dream</p>
                <p className="text-sm text-white">
                  “I was walking through a city made of glass, and every step echoed like thunder.
                  The moon kept following me…”
                </p>
              </div>

              <div className="bg-gradient-to-r from-lavender/20 via-orchid/30 to-crimson/20 rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-lavender/80 mb-1">iDreampt’s reflection</p>
                <p className="text-sm text-white mb-2">
                  Glass cities often point to feeling observed or emotionally exposed. 
                  The echoing steps suggest your choices feel louder than you intend,
                  while the persistent moon hints at unseen emotional cycles or intuition
                  that’s trying to get your attention.
                </p>
                <p className="text-xs text-lavender/80">
                  Sources: Archetypal psychology • Lunar astrology • Symbolic dream traditions
                </p>
              </div>

              <p className="mt-4 text-[11px] text-lavender/80 text-center">
                Turn confusing dreams into practical insight in just a few minutes.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="w-full max-w-6xl mx-auto px-4 pb-16"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-lavender" />
            How iDreampt works
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-sm text-lavender/90">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender mb-2">
                1 · Tell us your dream
              </p>
              <p>
                Type your dream in your own words—include emotions, people, places, symbols,
                and anything that stood out. The more detail, the richer the interpretation.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender mb-2">
                2 · Multilens analysis
              </p>
              <p>
                Our AI blends psychology, spirituality, astrology, and classic dream lore
                to see your dream from multiple angles, then weaves them into one clear story.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender mb-2">
                3 · Waking-life insight
              </p>
              <p>
                You’ll get an interpretation plus reflective prompts so you can connect your
                dream to patterns, decisions, and relationships in your waking life.
              </p>
            </div>
          </div>
        </section>

        {/* Modalities / what we use */}
        <section
          id="modalities"
          className="w-full max-w-6xl mx-auto px-4 pb-20"
        >
          <div className="bg-cosmic/60 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur">
            <h3 className="text-lg md:text-xl font-semibold mb-3">
              A modern dream guide with ancient roots.
            </h3>
            <p className="text-sm text-lavender/90 mb-5 max-w-2xl">
              iDreampt doesn’t just spit out generic meanings. It cross-references multiple
              traditions and frameworks to give you nuanced, personalized insight.
            </p>

            <div className="grid md:grid-cols-4 gap-4 text-sm text-lavender/90">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender mb-1">
                  Psychology
                </p>
                <p>Archetypes, defense patterns, emotional themes, and unconscious desires.</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender mb-1">
                  Spirituality
                </p>
                <p>Symbolic messages, intuition, guidance, and soul-level narratives.</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender mb-1">
                  Astrology
                </p>
                <p>Planetary archetypes, lunar cycles, and themes tied to your natal energy.</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender mb-1">
                  Symbolism
                </p>
                <p>Classic dream dictionaries reinterpreted in a modern, personalized way.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-lavender/80">
                Your dreams aren’t random. They’re messages. iDreampt helps you read them.
              </p>
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-lavender text-cosmic hover:brightness-110 transition-all shadow-md shadow-black/40"
              >
                Start interpreting my dreams
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-lavender/80">
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
