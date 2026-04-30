import { useEffect, useMemo, useState } from "react";
import { Sparkles, Search, Mic, Wifi, Coffee, Users, MapPin, Sun, Moon } from "lucide-react";

const PLACEHOLDERS = [
  "Quiet workspace near me…",
  "Rooftop desk under ₹500…",
  "Meeting room for 8 with whiteboard…",
  "Cozy café with fast wifi…",
  "Sunlit studio for deep focus…",
];

const CHIP_SETS = [
  [
    { icon: Wifi, label: "fast wifi + coffee" },
    { icon: Users, label: "meeting room for 8" },
    { icon: MapPin, label: "near the canal" },
  ],
  [
    { icon: Coffee, label: "quiet café corner" },
    { icon: Sun, label: "rooftop with view" },
    { icon: Wifi, label: "gigabit internet" },
  ],
];

function useTypewriter(words: string[], speed = 55, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    if (!del && text === word) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setI((v) => v + 1);
      return;
    }
    const t = setTimeout(
      () => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      del ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);

  return text;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 5) return { text: "Late night grind? We got you", icon: Moon };
  if (h < 12) return { text: "Find your focus this morning", icon: Sun };
  if (h < 17) return { text: "Power through the afternoon", icon: Sun };
  if (h < 21) return { text: "Wind-down session this evening", icon: Moon };
  return { text: "Late night grind? We got you", icon: Moon };
}

export function HeroSearch() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [chipIdx, setChipIdx] = useState(0);
  const placeholder = useTypewriter(PLACEHOLDERS);
  const greeting = useMemo(getGreeting, []);
  const GreetIcon = greeting.icon;

  useEffect(() => {
    const t = setInterval(() => setChipIdx((v) => (v + 1) % CHIP_SETS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const chips = CHIP_SETS[chipIdx];

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl animate-blob"
          style={{ background: "radial-gradient(circle, var(--teal), transparent 60%)" }}
        />
        <div
          className="absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl animate-blob-2"
          style={{ background: "radial-gradient(circle, var(--mint), transparent 60%)" }}
        />
        {/* noise */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-[88vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        {/* greeting pill */}
        <div
          className="animate-hero-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md"
          style={{ animationDelay: "0ms" }}
        >
          <GreetIcon className="h-3.5 w-3.5 text-teal" />
          <span>{greeting.text}</span>
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-gradient-accent px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
            <Sparkles className="h-3 w-3" /> AI
          </span>
        </div>

        {/* heading */}
        <h1
          className="animate-hero-fade-up text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          Find your <span className="text-gradient">perfect workspace</span>
          <br />
          for the work you came to do.
        </h1>

        {/* subtext */}
        <p
          className="animate-hero-fade-up mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "240ms" }}
        >
          From quiet studios to rooftop desks — book by the hour, chat with hosts in real time, and just show up.
        </p>

        {/* search */}
        <div
          className="animate-hero-fade-up mt-12 w-full max-w-3xl"
          style={{ animationDelay: "360ms" }}
        >
          <div
            className={[
              "glass shadow-soft dark:shadow-glow group relative rounded-2xl p-2 transition-all duration-300",
              focused ? "scale-[1.015] ring-2 ring-teal/40" : "",
            ].join(" ")}
          >
            {/* gradient ring on focus */}
            <div
              aria-hidden
              className={[
                "pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300",
                focused ? "opacity-100" : "",
              ].join(" ")}
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--teal) 60%, transparent), transparent 60%)",
                padding: 1,
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-accent text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="relative flex-1">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="h-12 w-full bg-transparent text-base text-foreground placeholder:text-transparent outline-none sm:text-lg"
                  aria-label="Search workspaces"
                />
                {!value && (
                  <div className="pointer-events-none absolute inset-0 flex items-center text-base text-muted-foreground sm:text-lg">
                    <span>{placeholder}</span>
                    <span className="animate-caret ml-0.5 inline-block h-5 w-[2px] bg-teal" />
                  </div>
                )}
              </div>
              <button
                type="button"
                aria-label="Voice search"
                className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/40 text-muted-foreground transition-all duration-300 hover:scale-105 hover:text-teal hover:border-teal/40 sm:flex"
              >
                <Mic className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="bg-gradient-accent group/btn relative inline-flex h-12 shrink-0 items-center gap-2 overflow-hidden rounded-xl px-5 font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_30px_-4px_var(--teal)] active:scale-95 sm:px-6"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                />
              </button>
            </div>
          </div>

          {/* chips */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Try:</span>
            {chips.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setValue(label)}
                className="group/chip inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-foreground/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:text-foreground hover:shadow-soft dark:hover:shadow-[0_0_24px_-6px_var(--teal)]"
              >
                <Icon className="h-3.5 w-3.5 text-teal transition-transform duration-300 group-hover/chip:scale-110" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSearch;