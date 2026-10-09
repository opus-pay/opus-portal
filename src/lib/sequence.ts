/**
 * Lays out a sequence diagram: who talks to whom, in order. Pure arithmetic, so the page only has to draw what comes
 * back and a test can check it. Text is measured by character kind (a wide character counts a full font size, a
 * Latin one about half), which is close enough to wrap text to its column in all four languages.
 */

export type SeqStep =
    | { k: "call" | "return"; from: number; to: number; text: string }
    | { k: "note"; from: number; to: number; text: string };

export interface SeqLayout {
    width: number;
    height: number;
    columns: { x: number; lines: string[] }[];
    headerHeight: number;
    rows: SeqRow[];
}

export type SeqRow =
    | {
          k: "call" | "return";
          n: number;
          x1: number;
          x2: number;
          y: number;
          lines: string[];
          textX: number;
          self: boolean;
      }
    | { k: "note"; x: number; width: number; y: number; height: number; lines: string[] };

export const FONT = 12.5;
export const LINE = 16;
export const COLUMN = 140;

const isWide = (ch: string) => /[ᄀ-ᇿ⺀-鿿가-힯＀-￯]/.test(ch);
const widthOf = (text: string, font: number) =>
    [...text].reduce((sum, ch) => sum + (isWide(ch) ? font : font * 0.58), 0);

/** Breaks text into lines no wider than `max`: at spaces (Korean has them), and anywhere between Chinese and Japanese characters. */
export function wrapText(text: string, max: number, font = FONT): string[] {
    const tokens = text.match(/[\u2e80-\u9fff\uff00-\uffef]|[^\s\u2e80-\u9fff\uff00-\uffef]+|\s+/g) ?? [];
    const lines: string[] = [];
    let line = "";
    for (const token of tokens) {
        const next = line + token;
        if (line !== "" && widthOf(next.trimEnd(), font) > max) {
            lines.push(line.trimEnd());
            line = token.trimStart();
        } else line = next;
    }
    if (line.trim() !== "") lines.push(line.trimEnd());
    return lines.length > 0 ? lines : [""];
}

export function layoutSequence(actors: string[], steps: SeqStep[]): SeqLayout {
    const n = actors.length;
    const width = n * COLUMN;
    const centre = (i: number) => COLUMN * i + COLUMN / 2;
    const columns = actors.map((name, i) => ({ x: centre(i), lines: wrapText(name, COLUMN - 34, FONT + 0.5) }));
    const headerHeight = Math.max(...columns.map((c) => c.lines.length)) * LINE + 18;

    let y = headerHeight + 14;
    let count = 0;
    const rows: SeqRow[] = [];
    for (const step of steps) {
        if (step.k === "note") {
            const lo = Math.min(step.from, step.to);
            const hi = Math.max(step.from, step.to);
            const x = COLUMN * lo + 8;
            const w = COLUMN * (hi - lo + 1) - 16;
            const lines = wrapText(step.text, w - 20);
            const height = lines.length * LINE + 14;
            rows.push({ k: "note", x, width: w, y, height, lines });
            y += height + 14;
            continue;
        }
        count++;
        const self = step.from === step.to;
        const span = Math.abs(centre(step.to) - centre(step.from));
        const room = self ? COLUMN * 1.2 : span - 14;
        const lines = wrapText(`${count}. ${step.text}`, Math.max(room, 90));
        const x1 = centre(step.from);
        const x2 = self ? x1 + 30 : centre(step.to);
        const left = self ? x1 + 38 : Math.min(x1, x2) + 8;
        rows.push({
            k: step.k,
            n: count,
            x1,
            x2,
            y: y + lines.length * LINE + 6,
            lines,
            textX: left,
            self,
        });
        y += lines.length * LINE + 26;
    }
    return { width, height: y + 6, columns, headerHeight, rows };
}
