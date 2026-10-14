"use client";
import { useEffect, useState } from "react";
import { boardsKey, validateBoard, type ProjectBoard } from "../../lib/boards";

let visitBoards: ProjectBoard[] = [];
let storageUnavailable = false;
const eventName = "designkit:boards-updated";
function readBoards() {
  if (storageUnavailable) return visitBoards;
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(boardsKey) || "[]");
    if (Array.isArray(raw))
      visitBoards = raw.flatMap((entry) => {
        try {
          return [validateBoard(entry)];
        } catch {
          return [];
        }
      });
  } catch {}
  return visitBoards;
}
export function useBoards() {
  const [boards, setBoards] = useState<ProjectBoard[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const sync = () => {
      setBoards([...readBoards()]);
      setReady(true);
    };
    sync();
    window.addEventListener(eventName, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(eventName, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const update = (next: ProjectBoard[]) => {
    const valid = next.map(validateBoard);
    visitBoards = valid;
    setBoards(valid);
    try {
      localStorage.setItem(boardsKey, JSON.stringify(valid));
      storageUnavailable = false;
      setError("");
    } catch {
      storageUnavailable = true;
      setError(
        "Changes are kept for this visit. Export your board to keep them; browser storage is unavailable.",
      );
    }
    window.dispatchEvent(new Event(eventName));
  };
  return { boards, ready, error, update };
}
