import type { MessageKey } from "./i18n";

/** Exchanges named as examples. Plain https links, no referral codes: the Portal earns nothing from them. */
export type Exchange = { id: "gate" | "upbit"; name: string; href: string; desc: MessageKey };

export const EXCHANGES: readonly Exchange[] = [
    { id: "gate", name: "Gate", href: "https://www.gate.com", desc: "guide.gate.desc" },
    { id: "upbit", name: "Upbit", href: "https://upbit.com", desc: "guide.upbit.desc" },
];

export type FlowNode = { title: MessageKey; sub: MessageKey };
/** `arrows[i]` labels the step from `nodes[i]` to `nodes[i + 1]`. */
export type Flow = {
    id: string;
    nodes: readonly FlowNode[];
    arrows: readonly MessageKey[];
    steps: readonly MessageKey[];
};

export const FLOWS: Record<"gate" | "upbit" | "out", Flow> = {
    gate: {
        id: "gate",
        nodes: [
            { title: "flow.exchange", sub: "flow.exchange.sub" },
            { title: "flow.app", sub: "flow.app.sub" },
            { title: "flow.service", sub: "flow.service.sub" },
        ],
        arrows: ["arrow.withdraw", "arrow.pay"],
        steps: ["guide.gate.s1", "guide.gate.s2", "guide.gate.s3", "guide.gate.s4", "guide.gate.s5"],
    },
    upbit: {
        id: "upbit",
        nodes: [
            { title: "flow.upbit", sub: "flow.upbit.sub" },
            { title: "flow.registered", sub: "flow.registered.sub" },
            { title: "flow.app", sub: "flow.app.sub" },
            { title: "flow.service", sub: "flow.service.sub" },
        ],
        arrows: ["arrow.withdrawRegistered", "arrow.sendApp", "arrow.pay"],
        steps: [
            "guide.upbit.s1",
            "guide.upbit.s2",
            "guide.upbit.s3",
            "guide.upbit.s4",
            "guide.upbit.s5",
            "guide.upbit.s6",
        ],
    },
    out: {
        id: "out",
        nodes: [
            { title: "flow.app", sub: "flow.app.sub" },
            { title: "flow.deposit", sub: "flow.deposit.sub" },
        ],
        arrows: ["arrow.sendBack"],
        steps: ["guide.out.s1", "guide.out.s2", "guide.out.s3", "guide.out.s4"],
    },
};
