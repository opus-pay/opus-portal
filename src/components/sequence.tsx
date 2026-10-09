"use client";

import { useId } from "react";

import { FONT, LINE, layoutSequence, type SeqStep } from "../lib/sequence";

/**
 * A sequence diagram drawn from data: boxes with the parties at the top, a dashed line down from each, an arrow per
 * message in order, and notes across the lines. Colours follow the theme. On a narrow screen the diagram keeps its
 * size and scrolls sideways, because squeezing it would make the words too small to read.
 */
export function SequenceDiagram({ label, actors, steps }: { label: string; actors: string[]; steps: SeqStep[] }) {
    const id = useId();
    const layout = layoutSequence(actors, steps);
    const arrow = `${id}-arrow`;
    return (
        <div className="overflow-x-auto rounded-xl border border-line bg-canvas p-2">
            <svg
                role="img"
                aria-label={label}
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                width={layout.width}
                height={layout.height}
                className="mx-auto block max-w-none text-ink"
                fontFamily="inherit"
                fontSize={FONT}
            >
                <defs>
                    <marker
                        id={arrow}
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="7"
                        markerHeight="7"
                        orient="auto-start-reverse"
                    >
                        <path d="M0 0L10 5L0 10z" fill="currentColor" />
                    </marker>
                </defs>

                {layout.columns.map((column, i) => (
                    <g key={i}>
                        <line
                            x1={column.x}
                            x2={column.x}
                            y1={layout.headerHeight}
                            y2={layout.height - 4}
                            stroke="currentColor"
                            strokeOpacity={0.3}
                            strokeDasharray="4 5"
                        />
                        <rect
                            x={column.x - 61}
                            y={4}
                            width={122}
                            height={layout.headerHeight - 8}
                            rx={9}
                            fill="currentColor"
                            fillOpacity={0.07}
                            stroke="currentColor"
                            strokeOpacity={0.5}
                        />
                        {column.lines.map((line, j) => (
                            <text
                                key={j}
                                x={column.x}
                                y={4 + 20 + j * LINE}
                                textAnchor="middle"
                                fontWeight={700}
                                fill="currentColor"
                            >
                                {line}
                            </text>
                        ))}
                    </g>
                ))}

                {layout.rows.map((row, i) =>
                    row.k === "note" ? (
                        <g key={i}>
                            <rect
                                x={row.x}
                                y={row.y}
                                width={row.width}
                                height={row.height}
                                rx={8}
                                className="text-accent"
                                fill="currentColor"
                                fillOpacity={0.12}
                                stroke="currentColor"
                                strokeOpacity={0.5}
                            />
                            {row.lines.map((line, j) => (
                                <text key={j} x={row.x + 10} y={row.y + 18 + j * LINE} fill="currentColor">
                                    {line}
                                </text>
                            ))}
                        </g>
                    ) : (
                        <g key={i} className={row.k === "return" ? "text-muted" : "text-accent"}>
                            {row.lines.map((line, j) => (
                                <text
                                    key={j}
                                    x={row.textX}
                                    y={row.y - 6 - (row.lines.length - 1 - j) * LINE}
                                    fill="currentColor"
                                    className="text-ink"
                                    style={{ fill: "var(--color-ink, currentColor)" }}
                                >
                                    {line}
                                </text>
                            ))}
                            {row.self ? (
                                <path
                                    d={`M${row.x1} ${row.y - 12}h30v16h-30`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.6}
                                    markerEnd={`url(#${arrow})`}
                                />
                            ) : (
                                <line
                                    x1={row.x1}
                                    x2={row.x2}
                                    y1={row.y}
                                    y2={row.y}
                                    stroke="currentColor"
                                    strokeWidth={1.6}
                                    strokeDasharray={row.k === "return" ? "5 4" : undefined}
                                    markerEnd={`url(#${arrow})`}
                                />
                            )}
                        </g>
                    )
                )}
            </svg>
        </div>
    );
}
