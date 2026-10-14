"use client";
import { useState } from "react";
import Link from "next/link";
import { styles } from "../../data/styles";
import { kitVersion, repositoryUrl } from "../../data/kit-types";
import CommandBox from "./CommandBox";
export default function AgentsGuide() {
  const [styleId, setStyleId] = useState("wabi-sabi");
  const style = styles.find((entry) => entry.id === styleId)!;
  return (
    <>
      <div className="kit-page-intro">
        <p>Good directions travel.</p>
        <h1>Take the kit with you.</h1>
        <p>
          Give your agent a design language with real examples, visual references,
          usable source, and the reasoning behind it. Free, open, and yours to adapt.
        </p>
      </div>
      <section className="agent-step" aria-labelledby="agent-skills">
        <div className="agent-step-title">
          <span>01 / Choose a direction</span>
          <h2 id="agent-skills">A skill with substance.</h2>
          <p>
            One discovery skill and 22 style skills. Each style includes three
            original examples, scoped CSS, native React components, design
            tokens, desktop and phone screenshots, and licensed fonts.
          </p>
        </div>
        <div>
          <label className="agent-choice">
            Design language
            <select
              value={styleId}
              onChange={(event) => setStyleId(event.target.value)}
            >
              <option value="discovery">Help me choose</option>
              {styles.map((entry) => (
                <option value={entry.id} key={entry.id}>
                  {entry.name}
                </option>
              ))}
            </select>
          </label>
          <CommandBox
            command={`npx skills add {url} --skill ${styleId === "discovery" ? "designkit" : `designkit-${styleId}`}`}
            originPath=""
          />
          <p className="agent-note">
            Choose your agent and installation scope in the CLI. Ask it to use{" "}
            {styleId === "discovery"
              ? "DesignKit to compare directions for your brief"
              : `${style?.name} for your project`}
            ; it can adapt the source or translate the principles to your stack.
          </p>
          <div className="kit-example-links">
            <a
              href={`/kits/skills/${styleId === "discovery" ? "designkit" : `designkit-${styleId}`}.zip`}
              download
            >
              Download the skill ↗
            </a>
            {styleId !== "discovery" ? (
              <Link href={`/styles/${styleId}`}>Explore this direction ↗</Link>
            ) : null}
          </div>
        </div>
      </section>
      <section className="agent-step" aria-labelledby="agent-source">
        <div className="agent-step-title">
          <span>02 / Make it your own</span>
          <h2 id="agent-source">Start from a working example.</h2>
          <p>
            Download a complete React kit from any example. Use the playground
            to choose fonts, accent, spacing, geometry, and text; export those
            exact choices as CSS, Tailwind v4, or design-token JSON.
          </p>
        </div>
        <div>
          <Link href="/examples" className="primary-button">
            Explore 66 examples ↗
          </Link>
          <p className="agent-note">
            A source kit contains the default example, components, CSS, fonts,
            licenses, and DESIGN.md. Playground exports capture your custom
            decisions separately.
          </p>
          <p>
            Collect your choices in a <Link href="/boards">project board</Link>{" "}
            and export a DESIGN.md that includes the audience, required views,
            constraints, and primary direction.
          </p>
        </div>
      </section>
      <section className="agent-step" aria-labelledby="agent-components">
        <div className="agent-step-title">
          <span>03 / Keep the useful details</span>
          <h2 id="agent-components">Bring a component.</h2>
          <p>
            132 native React patterns across all 22 styles. Each component page
            has its source ZIP and a shadcn registry command with everything it
            needs.
          </p>
        </div>
        <div>
          <CommandBox
            command="npx shadcn@latest add {url}"
            originPath="/r/claymorphism-button.json"
          />
          <p className="agent-note">
            Run this in a configured shadcn project. The registry installs
            source files, scoped CSS, self-hosted font data, and licenses; no
            DesignKit runtime dependency.
          </p>
          <Link href="/components" className="text-link">
            Compare the patterns ↗
          </Link>
        </div>
      </section>
      <section className="agent-step" aria-labelledby="agent-data">
        <div className="agent-step-title">
          <span>04 / Read the reference</span>
          <h2 id="agent-data">An open catalog.</h2>
          <p>
            Stable IDs connect the preview, Markdown guide, JSON record, and
            source kit. Version {kitVersion} records include a content digest so
            agents can identify the reference they used.
          </p>
        </div>
        <div className="agent-resource-list">
          <a href="/llms.txt">
            llms.txt <span>Start with the map ↗</span>
          </a>
          <a href="/kits/catalog.json">
            catalog.json <span>22 styles · 66 examples · 132 components ↗</span>
          </a>
          <a href="/r/registry.json">
            registry.json <span>Discover component names ↗</span>
          </a>
          <a href={repositoryUrl}>
            GitHub <span>Source, skills, and contribution history ↗</span>
          </a>
        </div>
      </section>
      <details className="agent-reference-index">
        <summary>All 22 style references</summary>
        <div>
          {styles.map((entry) => (
            <article key={entry.id}>
              <Link href={`/styles/${entry.id}`}>{entry.name}</Link>
              <a href={`/kits/styles/${entry.id}.md`}>Markdown</a>
              <a href={`/kits/styles/${entry.id}.json`}>JSON</a>
              <a href={`/kits/skills/designkit-${entry.id}.zip`} download>
                Skill ZIP
              </a>
            </article>
          ))}
        </div>
      </details>
      <p className="agent-license">
        Original examples and code are MIT. Bundled fonts retain their SIL Open
        Font License files. Preview carts, tasks, and schedules demonstrate
        local interactions; adapt them to your project’s behavior.
      </p>
    </>
  );
}
