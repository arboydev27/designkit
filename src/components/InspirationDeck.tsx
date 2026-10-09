"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { StylePreview } from "./StylePreview";
import "./inspiration-deck.css";

const directions = [
  { id: "neo-brutalism", name: "Neo-brutalism" },
  { id: "wabi-sabi", name: "Wabi-sabi" },
  { id: "surrealism", name: "Surrealism" },
  { id: "scrapbook", name: "Scrapbook" },
  { id: "claymorphism", name: "Claymorphism" },
  { id: "cyberpunk", name: "Cyberpunk" },
] as const;

const positions = [
  { x: -12, y: 18, rotate: -5 },
  { x: 5, y: 3, rotate: 3 },
  { x: 14, y: -4, rotate: 8 },
] as const;

const spring = { type: "spring" as const, stiffness: 430, damping: 38, mass: 0.85 };

type Travel = { direction: number; reduced: boolean };

const cardVariants: Variants = {
  enter: ({ direction, reduced }: Travel) => ({
    opacity: 0,
    ...(reduced ? {} : { x: direction * 42, y: 14, rotate: direction * 7 }),
  }),
  leave: ({ direction, reduced }: Travel) => ({
    opacity: 0,
    ...(reduced ? {} : { x: direction * -60, y: 12, rotate: direction * -12 }),
    transition: reduced
      ? { duration: 0 }
      : { ...spring, opacity: { duration: 0.12 } },
  }),
};

type DeckCardProps = {
  entry: (typeof directions)[number];
  position: number;
  travel: Travel;
  helpId: string;
  onOpen: (id: string) => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

function DeckCard({ entry, position, travel, helpId, onOpen, buttonRef }: DeckCardProps) {
  const isPresent = useIsPresent();
  const active = position === 0 && isPresent;

  return (
    <motion.div
      className={`inspiration-card${active ? " inspiration-card-current" : ""}`}
      style={{ zIndex: isPresent ? 3 - position : 0 }}
      custom={travel}
      variants={cardVariants}
      initial="enter"
      animate={{ ...positions[position], opacity: 1 }}
      exit="leave"
      transition={travel.reduced ? { duration: 0 } : spring}
      aria-hidden={!active}
      inert={!active}
    >
      <div className="inspiration-paper" aria-hidden="true">
        <div className="inspiration-specimen">
          <StylePreview id={entry.id} mode="card" />
        </div>
        <div className="inspiration-paper-caption">
          <span>{entry.name}</span>
          <span className="inspiration-paper-action">Take a closer look <ArrowUpRight size={15} /></span>
        </div>
      </div>
      {active ? (
        <button
          id="featured-style"
          ref={buttonRef}
          type="button"
          className="inspiration-open"
          aria-label={`Explore the ${entry.name} guide`}
          aria-describedby={helpId}
          onClick={() => onOpen(entry.id)}
        />
      ) : null}
    </motion.div>
  );
}

export default function InspirationDeck({
  onOpen,
  initialId,
}: {
  onOpen: (id: string) => void;
  initialId?: string;
}) {
  const [{ index, direction }, setPosition] = useState(() => ({
    index: Math.max(0, directions.findIndex((entry) => entry.id === initialId)),
    direction: 1,
  }));
  const reduced = useReducedMotion() ?? false;
  const activeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreCardFocus = useRef(false);
  const helpId = useId();
  const current = directions[index];
  const travel = { direction, reduced };

  useEffect(() => {
    if (restoreCardFocus.current) {
      activeButtonRef.current?.focus({ preventScroll: true });
      restoreCardFocus.current = false;
    }
  }, [index]);

  const step = (delta: number) => {
    setPosition((currentPosition) => ({
      index: (currentPosition.index + delta + directions.length) % directions.length,
      direction: delta,
    }));
  };

  const handleArrow = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    restoreCardFocus.current = event.target === activeButtonRef.current;
    step(event.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <section
      className="inspiration-deck"
      aria-label="Six design directions to explore"
      aria-roledescription="carousel"
      onKeyDown={handleArrow}
    >
      <p id={helpId} className="inspiration-sr-only">
        Use the Left and Right Arrow keys to change the design. Open the front card to explore its guide.
      </p>
      <div className="inspiration-stage">
        <AnimatePresence initial={false} custom={travel} mode="sync">
          {[2, 1, 0].map((position) => {
            const entry = directions[(index + position) % directions.length];
            return (
              <DeckCard
                key={entry.id}
                entry={entry}
                position={position}
                travel={travel}
                helpId={helpId}
                onOpen={onOpen}
                buttonRef={activeButtonRef}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <div className="inspiration-controls">
        <div className="inspiration-current" aria-live="polite" aria-atomic="true">
          <span className="inspiration-counter" aria-hidden="true">{String(index + 1).padStart(2, "0")} / 06</span>
          <span className="inspiration-name">{current.name}</span>
          <span className="inspiration-sr-only">, direction {index + 1} of {directions.length}</span>
        </div>
        <div className="inspiration-buttons" role="group" aria-label="Change the featured design">
          <button type="button" className="inspiration-arrow" onClick={() => step(-1)} aria-label="Previous design">
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <button type="button" className="inspiration-arrow" onClick={() => step(1)} aria-label="Next design">
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
