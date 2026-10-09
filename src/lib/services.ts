import type { MessageKey } from "./i18n";

/**
 * The services the Portal lists, in the order shown. Only an `active` service with a web address is a link;
 * everything else is shown as planned and cannot be chosen (no focus, no click, no text selection). Adding a
 * service is one entry here plus its description in `i18n.ts` (four languages). Names are brands and are not
 * translated. This is a directory: it names services, it never ranks them by who pays.
 */
export type ServiceId = "wayhand" | "tour" | "code";
export type Service = { id: ServiceId; name: string; status: "active" | "planned"; href?: string };

/** The address of WayHand. The build setting wins, so a test or staging site can point elsewhere. */
const WAYHAND = process.env.NEXT_PUBLIC_WAYHAND_URL?.trim() || "https://www.wayhand.app";

export const SERVICES: readonly Service[] = [
    { id: "wayhand", name: "WayHand", status: "active", href: WAYHAND },
    { id: "tour", name: "OPUS Tour", status: "planned" },
    { id: "code", name: "OPUS Code", status: "planned" },
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

/**
 * The address to open a service at: its own address plus `?lang=` with the language the reader chose here, so the
 * service starts in it (the shared rule of the mini-app standard: address, then last choice, then English).
 * Anything already in the address is kept; an address that is not a web address is returned as it is.
 */
export function serviceAddress(service: Service, language: string): string | undefined {
    if (!isWebAddress(service.href)) return service.href;
    const url = new URL(service.href);
    url.searchParams.set("lang", language);
    return url.toString();
}
