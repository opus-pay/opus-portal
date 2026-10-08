import type { MessageKey } from "./i18n";

/**
 * The services the Portal lists, in the order shown. Only an `active` service with a web address is a link;
 * everything else is shown as planned and cannot be chosen (no focus, no click, no text selection). Adding a
 * service is one entry here plus its description in `i18n.ts` (four languages). Names are brands and are not
 * translated. This is a directory: it names services, it never ranks them by who pays.
 */
export type ServiceId = "wayhand" | "class" | "asset" | "studio" | "tour" | "code" | "dub" | "biz" | "rights";
export type Service = { id: ServiceId; name: string; status: "active" | "planned"; href?: string };

/** The address of WayHand. The build setting wins, so a test or staging site can point elsewhere. */
const WAYHAND = process.env.NEXT_PUBLIC_WAYHAND_URL?.trim() || "https://www.wayhand.app";

export const SERVICES: readonly Service[] = [
    { id: "wayhand", name: "WayHand", status: "active", href: WAYHAND },
    { id: "class", name: "OPUS Class", status: "planned" },
    { id: "asset", name: "OPUS Asset", status: "planned" },
    { id: "studio", name: "OPUS Studio", status: "planned" },
    { id: "tour", name: "OPUS Tour", status: "planned" },
    { id: "code", name: "OPUS Code", status: "planned" },
    { id: "dub", name: "OPUS Dub", status: "planned" },
    { id: "biz", name: "OPUS Biz", status: "planned" },
    { id: "rights", name: "OPUS Rights", status: "planned" },
];

export const isWebAddress = (value: string | undefined): value is string => {
    if (value === undefined || value.trim() === "") return false;
    try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:";
    } catch {
        return false;
    }
};

/** Whether a visitor can open the service: it is active and its address is a web address. */
export const isOpen = (service: Service): boolean => service.status === "active" && isWebAddress(service.href);

export const descKey = (id: ServiceId) => `service.${id}.desc` as MessageKey;
