"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  boardItemName,
  exportBoard,
  importBoard,
  projectBrief,
  removeBoardItem,
  restoreBoard,
  type ProjectBoard,
} from "../../lib/boards";
import { downloadText } from "../../lib/download";
import {
  boardDecisionHref,
  boardHref,
  selectedBoard,
} from "../../lib/board-navigation";
import ContextLink from "./ContextLink";
import useUrlQuery from "./useUrlQuery";
import { useBoards } from "./useBoards";

export default function BoardsWorkspace() {
  const { boards, ready, error, update } = useBoards();
  const { params, update: updateQuery, ready: queryReady } = useUrlQuery();
  const canEdit = ready && queryReady;
  const selectedId = params.get("board") || "";
  const selectBoard = (id: string, replace = false) =>
    updateQuery({ board: id || null }, replace);
  const [message, setMessage] = useState("");
  const [removed, setRemoved] = useState<{
    board: ProjectBoard;
    index: number;
  } | null>(null);
  const [importing, setImporting] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const createButton = useRef<HTMLButtonElement>(null);
  const primarySelect = useRef<HTMLSelectElement>(null);
  const decisions = useRef<HTMLDivElement>(null);
  const board = selectedBoard(boards, selectedId);
  const activeBoardId = board?.id || "";
  useEffect(() => {
    if (ready && queryReady && selectedId !== activeBoardId)
      updateQuery({ board: activeBoardId || null }, true);
  }, [ready, queryReady, selectedId, activeBoardId, updateQuery]);
  const focusName = () => {
    requestAnimationFrame(() => {
      if (nameInput.current) nameInput.current.focus();
      else createButton.current?.focus();
    });
  };
  const patch = (
    changes:
      Partial<ProjectBoard> | ((board: ProjectBoard) => Partial<ProjectBoard>),
  ) => {
    if (!board) return null;
    return update((current) => {
      if (!current.some((entry) => entry.id === board.id))
        throw new Error(
          "This board was removed in another tab. Choose another board.",
        );
      return current.map((entry) =>
        entry.id === board.id
          ? {
              ...entry,
              ...(typeof changes === "function" ? changes(entry) : changes),
            }
          : entry,
      );
    });
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
    if (!update((current) => [...current, newBoard])) return;
    selectBoard(newBoard.id);
    setMessage("Project board created.");
    focusName();
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
          ref={createButton}
          className="primary-button"
          type="button"
          disabled={!canEdit}
          onClick={create}
        >
          Create a project board
        </button>
        <button
          className="small-button"
          type="button"
          disabled={!canEdit || importing}
          onClick={() => input.current?.click()}
        >
          {importing ? "Importing board…" : "Import a board"}
        </button>
        <input
          ref={input}
          type="file"
          accept="application/json,.json"
          className="detail-sr-only"
          tabIndex={-1}
          disabled={!canEdit || importing}
          aria-label="Import board JSON"
          onChange={async (event) => {
            const fileInput = event.currentTarget;
            const file = fileInput.files?.[0];
            if (!file) return;
            setImporting(true);
            setMessage("");
            try {
              if (file.size > 1_000_000)
                throw new Error("Choose a board smaller than 1 MB.");
              const imported = importBoard(await file.text());
              const copy = {
                ...imported,
                id: crypto.randomUUID(),
                name: `${imported.name.slice(0, 109)} (imported)`,
              };
              if (update((current) => [...current, copy])) {
                selectBoard(copy.id);
                setMessage("Board imported. Your existing boards were kept.");
                focusName();
              }
            } catch (error) {
              setMessage(
                error instanceof Error
                  ? error.message
                  : "This file could not be imported.",
              );
            } finally {
              fileInput.value = "";
              setImporting(false);
            }
          }}
        />
      </div>
      {removed ? (
        <p className="kit-results" role="status">
          {removed.board.name} removed.{" "}
          <button
            className="small-button"
            type="button"
            onClick={() => {
              if (
                !update((current) =>
                  restoreBoard(current, removed.board, removed.index),
                )
              )
                return;
              selectBoard(removed.board.id);
              setRemoved(null);
              setMessage("Project board restored.");
              focusName();
            }}
          >
            Undo
          </button>
        </p>
      ) : null}
      {message || error ? (
        <p role="status" className="kit-results">
          {[message, error].filter(Boolean).join(" ")}
        </p>
      ) : null}
      {!canEdit ? (
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
                onClick={() => {
                  selectBoard(entry.id);
                  setMessage("");
                }}
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
                ref={nameInput}
                key={`${board.id}-${board.name}`}
                defaultValue={board.name}
                maxLength={120}
                onBlur={(event) => {
                  const name =
                    event.target.value.trim() || "An untitled project";
                  event.target.value = name;
                  patch({ name });
                }}
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
                ref={primarySelect}
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
            <div ref={decisions} className="board-decisions">
              <h2>Your decisions.</h2>
              {!board.items.length ? (
                <p>
                  Find a useful example or component, then add it to this board.
                </p>
              ) : (
                board.items.map((item, index) => (
                  <article key={`${item.kind}-${item.id}`}>
                    <div>
                      <span>{item.kind}</span>
                      {item.kind === "font" ? (
                        <strong style={{ fontFamily: item.id }}>
                          {item.id}
                        </strong>
                      ) : (
                        <ContextLink
                          href={boardDecisionHref(board.id, item.kind, item.id)}
                          fallback={boardHref(board.id)}
                        >
                          {boardItemName(item)} ↗
                        </ContextLink>
                      )}
                      {item.settings ? (
                        <small>Includes your playground choices.</small>
                      ) : null}
                    </div>
                    <button
                      className="small-button"
                      type="button"
                      aria-label={`Remove ${boardItemName(item)}`}
                      onClick={() => {
                        if (!patch((current) => removeBoardItem(current, item)))
                          return;
                        setMessage(`${boardItemName(item)} removed.`);
                        requestAnimationFrame(() => {
                          const buttons =
                            decisions.current?.querySelectorAll<HTMLButtonElement>(
                              "button",
                            );
                          const next =
                            buttons?.[Math.min(index, buttons.length - 1)];
                          if (next) next.focus();
                          else primarySelect.current?.focus();
                        });
                      }}
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
                let deleted: { board: ProjectBoard; index: number } | undefined;
                const result = update((current) => {
                  const index = current.findIndex(
                    (entry) => entry.id === board.id,
                  );
                  if (index === -1)
                    throw new Error(
                      "This board was already removed in another tab.",
                    );
                  deleted = { board: current[index], index };
                  return current.filter((entry) => entry.id !== board.id);
                });
                if (!result || !deleted) return;
                setRemoved(deleted);
                selectBoard(result[0]?.id || "", true);
                setMessage("");
                focusName();
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
