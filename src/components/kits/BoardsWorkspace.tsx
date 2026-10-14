"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  boardItemName,
  exportBoard,
  importBoard,
  projectBrief,
  type ProjectBoard,
} from "../../lib/boards";
import { downloadText } from "../../lib/download";
import { useBoards } from "./useBoards";

export default function BoardsWorkspace() {
  const { boards, ready, error, update } = useBoards();
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");
  const [removed, setRemoved] = useState<ProjectBoard | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const board = boards.find((board) => board.id === selectedId) || boards[0];
  const patch = (changes: Partial<ProjectBoard>) => {
    if (board)
      update(
        boards.map((current) =>
          current.id === board.id ? { ...current, ...changes } : current,
        ),
      );
  };
  const create = () => {
    const newBoard: ProjectBoard = {
      id: crypto.randomUUID(),
      name: "An untitled project",
      audience: "",
      pages: "",
      constraints: "",
      primaryExampleId: "",
      items: [],
    };
    update([...boards, newBoard]);
    setSelectedId(newBoard.id);
  };
  return (
    <>
      <div className="kit-page-intro">
        <p>From a good reference to a clear direction.</p>
        <h1>A place for your project.</h1>
        <p>
          Collect exact decisions, describe what you're building, and export a
          DESIGN.md your team or agent can use.
        </p>
      </div>
      <div className="board-actions">
        <button
          className="primary-button"
          type="button"
          disabled={!ready}
          onClick={create}
        >
          Create a project board
        </button>
        <button
          className="small-button"
          type="button"
          onClick={() => input.current?.click()}
        >
          Import a board
        </button>
        <input
          ref={input}
          type="file"
          accept="application/json,.json"
          className="detail-sr-only"
          aria-label="Import board JSON"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            try {
              if (file.size > 1_000_000)
                throw new Error("Choose a board smaller than 1 MB.");
              const imported = importBoard(await file.text());
              const copy = {
                ...imported,
                id: crypto.randomUUID(),
                name: `${imported.name} (imported)`,
              };
              update([...boards, copy]);
              setSelectedId(copy.id);
              setMessage("Board imported. Your existing boards were kept.");
            } catch (error) {
              setMessage(
                error instanceof Error
                  ? error.message
                  : "This file could not be imported.",
              );
            }
            event.target.value = "";
          }}
        />
      </div>
      {removed ? (
        <p className="kit-results" role="status">
          {removed.name} removed.{" "}
          <button
            className="small-button"
            type="button"
            onClick={() => {
              update([
                ...boards.filter((entry) => entry.id !== removed.id),
                removed,
              ]);
              setSelectedId(removed.id);
              setRemoved(null);
            }}
          >
            Undo
          </button>
        </p>
      ) : null}
      {message || error ? (
        <p role="status" className="kit-results">
          {error || message}
        </p>
      ) : null}
      {!ready ? (
        <p role="status" className="kit-results">
          Opening your boards…
        </p>
      ) : !board ? (
        <div className="empty-state">
          <h2>Your next project starts with a direction.</h2>
          <p>Create a board here, or add an example while you explore.</p>
          <Link className="primary-button" href="/examples">
            Find an example ↗
          </Link>
        </div>
      ) : (
        <div className="boards-grid">
          <nav className="boards-list" aria-label="Project boards">
            {boards.map((entry) => (
              <button
                key={entry.id}
                type="button"
                aria-pressed={entry.id === board.id}
                onClick={() => setSelectedId(entry.id)}
              >
                <strong>{entry.name}</strong>
                <span>
                  {entry.items.length}{" "}
                  {entry.items.length === 1 ? "decision" : "decisions"}
                </span>
              </button>
            ))}
          </nav>
          <div className="board-editor">
            <label>
              Project name
              <input
                key={board.id}
                defaultValue={board.name}
                maxLength={120}
                onBlur={(event) =>
                  patch({
                    name: event.target.value.trim() || "An untitled project",
                  })
                }
              />
            </label>
            <div className="board-brief-fields">
              <label>
                Who is it for?
                <textarea
                  value={board.audience}
                  maxLength={1500}
                  onChange={(event) => patch({ audience: event.target.value })}
                  placeholder="Independent photographers showing their work to clients."
                />
              </label>
              <label>
                Pages and views
                <textarea
                  value={board.pages}
                  maxLength={1500}
                  onChange={(event) => patch({ pages: event.target.value })}
                  placeholder="Home, selected work, project details, about, contact."
                />
              </label>
            </div>
            <label>
              Constraints and priorities
              <textarea
                value={board.constraints}
                maxLength={4000}
                onChange={(event) => patch({ constraints: event.target.value })}
                placeholder="Readable on phones, large photography, understated motion, no tracking."
              />
            </label>
            <label>
              Primary design direction
              <select
                value={board.primaryExampleId}
                onChange={(event) =>
                  patch({ primaryExampleId: event.target.value })
                }
              >
                <option value="">Choose a saved example</option>
                {board.items
                  .filter((item) => item.kind === "example")
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {boardItemName(item)}
                    </option>
                  ))}
              </select>
            </label>
            <div className="board-decisions">
              <h2>Your decisions.</h2>
              {!board.items.length ? (
                <p>
                  Find a useful example or component, then add it to this board.
                </p>
              ) : (
                board.items.map((item) => (
                  <article key={`${item.kind}-${item.id}`}>
                    <div>
                      <span>{item.kind}</span>
                      {item.kind === "font" ? (
                        <strong style={{ fontFamily: item.id }}>
                          {item.id}
                        </strong>
                      ) : (
                        <Link
                          href={`/${item.kind === "component" ? "components" : "examples"}/${item.id}`}
                        >
                          {boardItemName(item)} ↗
                        </Link>
                      )}
                      {item.settings ? (
                        <small>Includes your playground choices.</small>
                      ) : null}
                    </div>
                    <button
                      className="small-button"
                      type="button"
                      aria-label={`Remove ${boardItemName(item)}`}
                      onClick={() =>
                        patch({
                          items: board.items.filter(
                            (entry) =>
                              !(
                                entry.kind === item.kind && entry.id === item.id
                              ),
                          ),
                          primaryExampleId:
                            board.primaryExampleId === item.id &&
                            item.kind === "example"
                              ? ""
                              : board.primaryExampleId,
                        })
                      }
                    >
                      Remove
                    </button>
                  </article>
                ))
              )}
            </div>
            <div className="board-actions">
              <button
                className="primary-button"
                type="button"
                disabled={!board.primaryExampleId}
                onClick={() =>
                  downloadText(
                    "DESIGN.md",
                    projectBrief(board),
                    "text/markdown",
                  )
                }
              >
                Export project DESIGN.md
              </button>
              <button
                className="small-button"
                type="button"
                onClick={() =>
                  downloadText(
                    `${board.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "project"}.designkit.json`,
                    exportBoard(board),
                    "application/json",
                  )
                }
              >
                Export board JSON
              </button>
            </div>
            {!board.primaryExampleId ? (
              <p className="kit-results">
                Choose a saved example as the primary direction to export a
                project brief.
              </p>
            ) : (
              <details className="example-source">
                <summary>Read the project brief</summary>
                <pre>{projectBrief(board)}</pre>
              </details>
            )}
            <button
              type="button"
              className="small-button"
              onClick={() => {
                setRemoved(board);
                update(boards.filter((entry) => entry.id !== board.id));
                setSelectedId("");
              }}
            >
              Remove this board
            </button>
            <Link className="text-link" href="/examples">
              Collect another example ↗
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
