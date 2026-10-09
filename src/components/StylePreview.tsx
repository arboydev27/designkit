import { memo, useId, type ComponentType } from "react";
import "./previews.css";

function Pottery() {
  const id = useId();
  return (
    <svg className="sp-pottery" viewBox="0 0 320 350" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-pot`} x1="0" x2="1">
          <stop stopColor="#8c6a4c" />
          <stop offset=".42" stopColor="#c5a982" />
          <stop offset=".68" stopColor="#b39773" />
          <stop offset="1" stopColor="#775d49" />
        </linearGradient>
        <radialGradient id={`${id}-sun`}>
          <stop stopColor="#bd8057" />
          <stop offset="1" stopColor="#cd9b75" />
        </radialGradient>
        <filter id={`${id}-grain`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".15" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </defs>
      <circle cx="214" cy="105" r="78" fill={`url(#${id}-sun)`} />
      <path d="M32 286 C110 277 236 282 304 292 L312 350 H0 Z" fill="#d3c9b9" />
      <ellipse cx="174" cy="298" rx="91" ry="14" fill="#8a7764" opacity=".17" />
      <path
        d="M145 144 Q150 169 122 192 Q94 215 100 258 Q106 302 163 307 Q221 305 224 263 Q230 221 198 193 Q178 174 185 144 Z"
        fill={`url(#${id}-pot)`}
        filter={`url(#${id}-grain)`}
      />
      <ellipse cx="165" cy="144" rx="21" ry="6" fill="#6a503d" />
      <ellipse cx="165" cy="143" rx="18" ry="3" fill="#483c2f" />
      <path
        d="M165 143 Q150 82 125 47 M155 105 Q183 86 192 62 M150 89 Q128 83 114 69"
        fill="none"
        stroke="#655747"
        strokeWidth="2"
      />
      <path
        d="M127 49 Q104 34 116 18 Q136 30 127 49 M184 77 Q191 51 210 48 Q208 72 184 77 M129 81 Q100 88 96 68 Q117 65 129 81"
        fill="#97866a"
      />
    </svg>
  );
}

function Flower({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`sp-flower ${className}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <path
        d="M100 61 C69 0 32 33 58 69 C0 44 0 107 56 108 C6 145 48 189 79 143 C73 204 136 203 127 142 C174 192 207 141 147 112 C210 108 190 46 143 73 C165 12 101 -2 100 61Z"
        fill="currentColor"
      />
      <circle cx="101" cy="103" r="24" fill="#f2ce45" />
      <circle cx="94" cy="99" r="3" fill="#2b2429" />
      <circle cx="110" cy="99" r="3" fill="#2b2429" />
      <path
        d="M93 109Q103 119 113 109"
        fill="none"
        stroke="#2b2429"
        strokeWidth="3"
      />
    </svg>
  );
}

function Wabi() {
  return (
    <div className="sp-wabi">
      <div className="sp-nav">
        <b>
          tsuchi<span> 土</span>
        </b>
        <span>Objects &nbsp; Our story &nbsp; Journal</span>
        <i>Bag (0)</i>
      </div>
      <div className="sp-wabi-body">
        <div className="sp-wabi-copy">
          <p className="sp-kicker">MADE SLOWLY. HELD FOREVER.</p>
          <h2>
            Beauty in the
            <br />
            <em>unfinished.</em>
          </h2>
          <p>
            Objects with a quiet presence.
            <br />
            Crafted by hand. Shaped by time.
          </p>
          <span className="sp-line-link">
            Discover the collection <span>↗</span>
          </span>
        </div>
        <div className="sp-wabi-art">
          <Pottery />
          <span>01 — EARTHEN VESSELS</span>
        </div>
      </div>
      <div className="sp-wabi-bottom">
        <span>Embrace the imperfect.</span>
        <span>Small batches, considered living.</span>
      </div>
    </div>
  );
}
function Brutal() {
  return (
    <div className="sp-brutal">
      <div className="sp-nav">
        <b>LOUD®</b>
        <span>WORK &nbsp; STUDIO &nbsp; CONTACT ↗</span>
      </div>
      <div className="sp-brutal-body">
        <div>
          <span className="sp-brutal-label">INDEPENDENT CREATIVE PEOPLE</span>
          <h2>
            MAKE
            <br />
            SOME
            <br />
            <span>NOISE.</span>
          </h2>
          <p>
            Good ideas don’t whisper.
            <br />
            We make brands impossible to ignore.
          </p>
          <span className="sp-brutal-cta">LET’S MAKE TROUBLE ↗</span>
        </div>
        <div className="sp-brutal-art">
          <span className="sp-brutal-star">✳</span>
          <span className="sp-brutal-note">
            GOOD
            <br />
            WEIRD
            <br />
            WORK.
          </span>
          <span className="sp-brutal-arrow">↗</span>
          <span className="sp-brutal-small">
            100%
            <br />
            ORIGINAL
          </span>
        </div>
      </div>
      <div className="sp-brutal-ticker">
        BIG IDEAS. BOLD MOVES. NO BORING STUFF. ↗ BIG IDEAS.
      </div>
    </div>
  );
}
function Glass() {
  return (
    <div className="sp-glass">
      <div className="sp-glass-orb sp-glass-orb-a" />
      <div className="sp-glass-orb sp-glass-orb-b" />
      <div className="sp-nav">
        <b>◈ aura</b>
        <span>Product &nbsp; Discover &nbsp; Pricing</span>
        <i>Get started ↗</i>
      </div>
      <div className="sp-glass-body">
        <div className="sp-glass-copy">
          <span className="sp-glass-pill">✦ YOUR SPACE TO THINK CLEARLY</span>
          <h2>
            Less friction.
            <br />
            <em>More flow.</em>
          </h2>
          <p>
            A little clarity for your everyday.
            <br />
            Everything you need, beautifully together.
          </p>
          <span className="sp-glass-cta">
            Find your flow <b>↗</b>
          </span>
          <div className="sp-glass-proof">
            <span>● ● ●</span> A calmer day starts here.
          </div>
        </div>
        <div className="sp-glass-dashboard">
          <div className="sp-glass-panel">
            <span>
              Your space <span>···</span>
            </span>
            <h3>
              Good things
              <br />
              are taking shape.
            </h3>
            <div className="sp-glass-chart">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="sp-glass-panel-bottom">
              <span>Weekly focus</span>
              <b>+24.8% ↗</b>
            </div>
          </div>
          <div className="sp-glass-mini">
            <span className="sp-glass-mini-icon">✦</span>
            <span>
              In your element
              <br />
              <b>4.5 hours of deep focus</b>
            </span>
            <i>↗</i>
          </div>
        </div>
      </div>
    </div>
  );
}
function Swiss() {
  return (
    <div className="sp-swiss">
      <div className="sp-nav">
        <b>FORM / 25</b>
        <span>INTERNATIONAL DESIGN SYMPOSIUM</span>
        <i>EN / DE</i>
      </div>
      <div className="sp-swiss-title">
        <span>
          Less.
          <br />
          But better.
        </span>
        <b>↗</b>
      </div>
      <div className="sp-swiss-rule" />
      <div className="sp-swiss-bottom">
        <span>
          01—03
          <br />
          ZÜRICH
        </span>
        <p>
          Three days of ideas.
          <br />
          One common language.
          <br />
          The future takes form.
        </p>
        <div>
          <span>OCTOBER 24—26, 2025</span>
          <b>Explore the programme ↗</b>
        </div>
      </div>
    </div>
  );
}
function Clay() {
  return (
    <div className="sp-clay">
      <div className="sp-nav">
        <b>
          poppy<span>✿</span>
        </b>
        <span>How it works &nbsp; Community</span>
        <i>Say hello ☺</i>
      </div>
      <div className="sp-clay-body">
        <div>
          <span className="sp-kicker">LITTLE STEPS, HAPPY DAYS</span>
          <h2>
            Make room
            <br />
            for <em>good things.</em>
          </h2>
          <p>
            Build habits that feel like you.
            <br />A softer way to grow, every day.
          </p>
          <span className="sp-clay-cta">Let’s bloom together ↗</span>
          <span className="sp-clay-caption">
            A little progress is still progress. ♡
          </span>
        </div>
        <div className="sp-clay-art">
          <div className="sp-clay-cloud">
            <i />
            <i />
            <i />
          </div>
          <div className="sp-clay-orb">
            <span>• &nbsp; •</span>
            <b>⌣</b>
          </div>
          <div className="sp-clay-heart">♥</div>
          <div className="sp-clay-tile">
            <span>✿</span>
            <b>You’ve got this!</b>
            <i>Day 01 of a happier you</i>
          </div>
        </div>
      </div>
    </div>
  );
}
function Editorial() {
  return (
    <div className="sp-editorial">
      <div className="sp-editorial-top">
        <span>INDEPENDENT JOURNAL OF CULTURE & LIVING</span>
        <span>VOL. 08 — AUTUMN 2025</span>
      </div>
      <div className="sp-editorial-masthead">
        The Ordinary<span>®</span>
      </div>
      <div className="sp-editorial-nav">
        <span>DESIGN</span>
        <span>CULTURE</span>
        <span>PLACES</span>
        <span>PEOPLE</span>
        <span>ABOUT</span>
      </div>
      <div className="sp-editorial-story">
        <div className="sp-editorial-photo">
          <div className="sp-editorial-building" />
          <span>THE ART OF PAYING ATTENTION</span>
        </div>
        <div className="sp-editorial-copy">
          <span>ESSAY — 06 MIN READ</span>
          <h2>
            On the quiet
            <br />
            art of <em>living.</em>
          </h2>
          <p>
            Finding something extraordinary
            <br />
            in the spaces between.
          </p>
          <b>Read the story ↗</b>
        </div>
      </div>
    </div>
  );
}
const specimens: Record<string, ComponentType> = {
  "wabi-sabi": Wabi,
  "neo-brutalism": Brutal,
  glassmorphism: Glass,
  "swiss-design": Swiss,
  claymorphism: Clay,
  "editorial-design": Editorial,
};

export const StylePreview = memo(function StylePreview({
  id,
  mode = "card",
}: {
  id: string;
  mode?: "card" | "desktop" | "mobile";
}) {
  const Specimen = specimens[id] ?? Wabi;
  return (
    <div
      className={`sp-root sp-preview sp-mode-${mode}`}
      aria-label={`${id.replaceAll("-", " ")} example website`}
    >
      <div className="sp-canvas">
        <Specimen />
      </div>
    </div>
  );
});
