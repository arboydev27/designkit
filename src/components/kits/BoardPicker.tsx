"use client";
import { useState } from "react";
import Link from "next/link";
import type { BoardItem, ProjectBoard } from "../../lib/boards";
import { useBoards } from "./useBoards";

export default function BoardPicker({ item }: { item: BoardItem }) {
  const { boards, ready, error, update } = useBoards();
  const [boardId, setBoardId] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const add = () => {
    let next: ProjectBoard[] = boards;
    let selected = boards.find((board) => board.id === boardId);
    if (!selected) {
      if (!name.trim()) {
        setMessage("Give your new board a name.");
        return;
      }
      selected = {
        id: crypto.randomUUID(),
        name: name.trim(),
        audience: "",
        pages: "",
        constraints: "",
        primaryExampleId: item.kind === "example" ? item.id : "",
        items: [],
      };
      next = [...boards, selected];
      setBoardId(selected.id);
    }
    update(
      next.map((board) =>
        board.id !== selected!.id
          ? board
          : {
              ...board,
              primaryExampleId:
                board.primaryExampleId ||
                (item.kind === "example" ? item.id : ""),
              items: [
                ...board.items.filter(
                  (saved) =>
                    !(saved.kind === item.kind && saved.id === item.id),
                ),
                item,
              ],
            },
      ),
    );
    setMessage(`Added to ${selected.name}.`);
  };
  return (
    <section
      className="board-picker"
      aria-label={`Save this ${item.kind} to a project board`}
    >
      <div>
        <h3>Keep this decision.</h3>
        <p>
          Collect the exact example, palette, font, or component for a project.
        </p>
      </div>
      <label>
        Project board
        <select
          disabled={!ready}
          value={boardId}
          onChange={(event) => setBoardId(event.target.value)}
        >
          <option value="">Create a new board</option>
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </label>
      {!boardId ? (
        <label>
          New board name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={120}
            placeholder="My photography portfolio"
          />
        </label>
      ) : null}
      <button
        type="button"
        className="primary-button"
        disabled={!ready}
        onClick={add}
      >
        Add to board
      </button>
      <Link href="/boards">Open project boards ↗</Link>
      {message || error ? <p role="status">{error || message}</p> : null}
    </section>
  );
}
