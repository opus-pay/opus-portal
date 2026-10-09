import type { SeqStep } from "./sequence";

/**
 * The architecture document: items with a title and a body. This file holds the shape (which item has which pictures
 * and in which order); the words are in architecture-text.ts, in four languages, under the keys named here.
 */
export type ArchBlock =
    | { t: "p"; text: string }
    | { t: "layers"; layers: { title: string; body: string }[]; caption: string }
    | { t: "terms"; terms: { term: string; body: string }[] }
    | { t: "list"; items: string[] }
    | { t: "seq"; label: string; actors: string[]; steps: SeqStep[] };

export interface ArchItem {
    id: string;
    title: string;
    blocks: ArchBlock[];
}

/** The parties of the diagrams, as keys of the text file. */
export const ACTORS = {
    client: "actor.client",
    provider: "actor.provider",
    service: "actor.service",
    factory: "actor.factory",
    core: "actor.core",
    evaluator: "actor.evaluator",
    forwarder: "actor.forwarder",
    relayer: "actor.relayer",
    arbiter: "actor.arbiter",
    anyone: "actor.anyone",
    treasury: "actor.treasury",
    wallet: "actor.wallet",
} as const;

type Spec = { label: string; actors: (keyof typeof ACTORS)[]; steps: SeqStep[] };

const call = (from: number, to: number, text: string): SeqStep => ({ k: "call", from, to, text });
const back = (from: number, to: number, text: string): SeqStep => ({ k: "return", from, to, text });
const note = (from: number, to: number, text: string): SeqStep => ({ k: "note", from, to, text });

export const SEQUENCES: Record<"create" | "post" | "complete" | "deadlines" | "dispute" | "relay", Spec> = {
    create: {
        label: "seq.create.label",
        actors: ["service", "factory", "core"],
        steps: [
            call(0, 1, "seq.create.1"),
            call(1, 2, "seq.create.2"),
            back(1, 0, "seq.create.3"),
            note(0, 2, "seq.create.note"),
        ],
    },
    post: {
        label: "seq.post.label",
        actors: ["client", "provider", "evaluator", "core"],
        steps: [
            call(0, 3, "seq.post.1"),
            call(1, 3, "seq.post.2"),
            call(0, 2, "seq.post.3"),
            call(0, 3, "seq.post.4"),
            note(0, 3, "seq.post.note"),
        ],
    },
    complete: {
        label: "seq.complete.label",
        actors: ["provider", "client", "evaluator", "core", "treasury"],
        steps: [
            call(0, 3, "seq.complete.1"),
            call(1, 2, "seq.complete.2"),
            call(2, 3, "seq.complete.3"),
            back(3, 0, "seq.complete.4"),
            back(3, 4, "seq.complete.5"),
            note(0, 4, "seq.complete.note"),
        ],
    },
    deadlines: {
        label: "seq.deadlines.label",
        actors: ["anyone", "evaluator", "core", "client"],
        steps: [
            note(0, 3, "seq.deadlines.a"),
            call(0, 1, "seq.deadlines.1"),
            call(1, 2, "seq.deadlines.2"),
            back(2, 3, "seq.deadlines.3"),
            note(0, 3, "seq.deadlines.b"),
            call(0, 1, "seq.deadlines.4"),
            call(1, 2, "seq.deadlines.5"),
            note(0, 3, "seq.deadlines.c"),
            call(0, 2, "seq.deadlines.6"),
            back(2, 3, "seq.deadlines.7"),
        ],
    },
    dispute: {
        label: "seq.dispute.label",
        actors: ["client", "provider", "evaluator", "arbiter", "core"],
        steps: [
            call(0, 2, "seq.dispute.1"),
            call(1, 2, "seq.dispute.2"),
            call(2, 3, "seq.dispute.3"),
            back(3, 2, "seq.dispute.4"),
            call(2, 4, "seq.dispute.5"),
            note(0, 4, "seq.dispute.note"),
        ],
    },
    relay: {
        label: "seq.relay.label",
        actors: ["wallet", "relayer", "forwarder", "core"],
        steps: [
            call(0, 0, "seq.relay.1"),
            call(0, 1, "seq.relay.2"),
            call(1, 2, "seq.relay.3"),
            call(2, 3, "seq.relay.4"),
            note(0, 3, "seq.relay.note"),
        ],
    },
};

const seq = (name: keyof typeof SEQUENCES): ArchBlock => {
    const spec = SEQUENCES[name];
    return { t: "seq", label: spec.label, actors: spec.actors.map((a) => ACTORS[a]), steps: spec.steps };
};

export const ITEMS: ArchItem[] = [
    {
        id: "overview",
        title: "item.overview",
        blocks: [
            { t: "p", text: "overview.intro" },
            {
                t: "layers",
                caption: "overview.caption",
                layers: [
                    { title: "layer.portal", body: "layer.portal.body" },
                    { title: "layer.services", body: "layer.services.body" },
                    { title: "layer.offchain", body: "layer.offchain.body" },
                    { title: "layer.onchain", body: "layer.onchain.body" },
                ],
            },
        ],
    },
    {
        id: "parts",
        title: "item.parts",
        blocks: [
            {
                t: "terms",
                terms: [
                    { term: "part.factory", body: "part.factory.body" },
                    { term: "part.core", body: "part.core.body" },
                    { term: "part.evaluator", body: "part.evaluator.body" },
                    { term: "part.forwarder", body: "part.forwarder.body" },
                    { term: "part.keeper", body: "part.keeper.body" },
                    { term: "part.sdk", body: "part.sdk.body" },
                    { term: "part.arbiter", body: "part.arbiter.body" },
                ],
            },
        ],
    },
    { id: "create", title: "item.create", blocks: [{ t: "p", text: "create.intro" }, seq("create")] },
    { id: "post", title: "item.post", blocks: [{ t: "p", text: "post.intro" }, seq("post")] },
    { id: "complete", title: "item.complete", blocks: [{ t: "p", text: "complete.intro" }, seq("complete")] },
    { id: "deadlines", title: "item.deadlines", blocks: [{ t: "p", text: "deadlines.intro" }, seq("deadlines")] },
    { id: "dispute", title: "item.dispute", blocks: [{ t: "p", text: "dispute.intro" }, seq("dispute")] },
    { id: "relay", title: "item.relay", blocks: [{ t: "p", text: "relay.intro" }, seq("relay")] },
    {
        id: "safety",
        title: "item.safety",
        blocks: [
            {
                t: "list",
                items: ["safety.1", "safety.2", "safety.3", "safety.4", "safety.5", "safety.6"],
            },
        ],
    },
];

/** Every text key the document uses, so a test can check that all four languages have them. */
export function textKeys(): string[] {
    const keys = new Set<string>(Object.values(ACTORS));
    for (const item of ITEMS) {
        keys.add(item.title);
        for (const block of item.blocks) {
            if (block.t === "p") keys.add(block.text);
            else if (block.t === "list") block.items.forEach((k) => keys.add(k));
            else if (block.t === "terms") block.terms.forEach((x) => (keys.add(x.term), keys.add(x.body)));
            else if (block.t === "layers") {
                keys.add(block.caption);
                block.layers.forEach((x) => (keys.add(x.title), keys.add(x.body)));
            } else {
                keys.add(block.label);
                block.steps.forEach((s) => keys.add(s.text));
            }
        }
    }
    return [...keys];
}
