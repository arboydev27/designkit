import type {
  DesignExample,
  PlaygroundSettings,
  StyleRecipe,
} from "../data/kit-types";
import type { BoardItem, ProjectBoard } from "./boards";
import { normalizeSettings } from "./kit-tokens";

type LinkedDecisionKind = Exclude<BoardItem["kind"], "font">;
type PlaygroundDecisionKind = "example" | "palette";

export function boardHref(boardId: string) {
  return `/boards/?${new URLSearchParams({ board: boardId })}`;
}
export function boardDecisionHref(
  boardId: string,
  kind: LinkedDecisionKind,
  itemId: string,
) {
  const route = kind === "component" ? "components" : "examples";
  const query = new URLSearchParams({ board: boardId, decision: kind });
  return `/${route}/${encodeURIComponent(itemId)}/?${query}`;
}
export function selectedBoard(boards: ProjectBoard[], boardId: string) {
  return boards.find((board) => board.id === boardId) || boards[0];
}

type SavedDecisionResult = {
  kind: PlaygroundDecisionKind;
  settings: PlaygroundSettings;
} & (
  | { status: "found"; boardName: string }
  | { status: "missing-board" | "missing-decision" }
);

export function createBoardDecisionRestorer() {
  let previousEntry: string | null = null;
  return ({
    boards,
    ready,
    boardId,
    kind,
    example,
    recipe,
  }: {
    boards: ProjectBoard[];
    ready: boolean;
    boardId: string | null;
    kind: string | null;
    example: DesignExample;
    recipe: StyleRecipe;
  }): SavedDecisionResult | null => {
    if (!ready) return null;
    if (!boardId || (kind !== "example" && kind !== "palette")) {
      previousEntry = null;
      return null;
    }
    const entry = JSON.stringify([boardId, kind, example.id]);
    if (entry === previousEntry) return null;
    previousEntry = entry;
    const board = boards.find((board) => board.id === boardId);
    const item = board?.items.find(
      (item) => item.id === example.id && item.kind === kind,
    );
    const settings = normalizeSettings(item?.settings ?? {}, example, recipe);
    if (!board) return { status: "missing-board", kind, settings };
    if (!item) return { status: "missing-decision", kind, settings };
    return { status: "found", kind, settings, boardName: board.name };
  };
}
