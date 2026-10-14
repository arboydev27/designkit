"use client";
import { useState } from "react";
import Link from "next/link";
import {
  addBoardItem,
  type BoardItem,
  type ProjectBoard,
} from "../../lib/boards";
import { useBoards } from "./useBoards";
import { boardHref } from "../../lib/board-navigation";
import useUrlQuery from "./useUrlQuery";

export default function BoardPicker({ item }: { item: BoardItem }) {
  const { boards, ready, error, update } = useBoards();
  const { params, ready: queryReady } = useUrlQuery();
  const canSave = ready && queryReady;
  const contextBoardId = params.get("board") || "";
  const [selection, setSelection] = useState<{
    sourceId: string;
    boardId: string;
  } | null>(null);
  const boardId =
    selection?.sourceId === contextBoardId ? selection.boardId : contextBoardId;
  const setBoardId = (id: string) =>
    setSelection({ sourceId: contextBoardId, boardId: id });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const selectedId = boards.some((board) => board.id === boardId)
    ? boardId
    : "";
  const add = () => {
    if (!selectedId && !name.trim()) {
      setMessage("Give your new board a name.");
      return;
    }
    let selected: ProjectBoard | undefined;
    let replaced = false;
    const result = update((current) => {
      selected = current.find((board) => board.id === selectedId);
      if (selectedId && !selected)
        throw new Error(
          "That board was removed. Choose a board or create a new one.",
        );
      if (!selected) {
        selected = {
          id: crypto.randomUUID(),
          name: name.trim(),
          audience: "",
          pages: "",
          constraints: "",
          primaryExampleId: "",
          items: [],
        };
        return [...current, addBoardItem(selected, item)];
      }
      replaced = selected.items.some(
        (saved) => saved.kind === item.kind && saved.id === item.id,
      );
      return current.map((board) =>
        board.id === selected!.id ? addBoardItem(board, item) : board,
      );
    });
    if (!result || !selected) return;
    setBoardId(selected.id);
    setMessage(`${replaced ? "Updated on" : "Added to"} ${selected.name}.`);
  };
  return (
    <form
      className="board-picker"
      aria-label={`Save this ${item.kind} to a project board`}
      onSubmit={(event) => {
        event.preventDefault();
        if (canSave) add();
      }}
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
          disabled={!canSave}
          value={selectedId}
          onChange={(event) => {
            setBoardId(event.target.value);
            setMessage("");
          }}
        >
          <option value="">Create a new board</option>
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </label>
      {!selectedId ? (
        <label>
          New board name
          <input
            value={name}
            disabled={!canSave}
            onChange={(event) => {
              setName(event.target.value);
              setMessage("");
            }}
            maxLength={120}
            placeholder="My photography portfolio"
          />
        </label>
      ) : null}
      <button type="submit" className="primary-button" disabled={!canSave}>
        Add to board
      </button>
      <Link href={selectedId ? boardHref(selectedId) : "/boards/"}>
        Open project boards ↗
      </Link>
      {message || error ? (
        <p role="status">{[message, error].filter(Boolean).join(" ")}</p>
      ) : null}
    </form>
  );
}
