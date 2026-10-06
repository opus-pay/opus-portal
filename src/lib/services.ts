import type { MessageKey } from "./i18n";

/**
 * The services the Portal lists, in the order shown. Only a service that is `live` and has an address is a link;
 * everything else is shown as planned and cannot be chosen. Adding a service is one line here plus its name and
 * description in `i18n.ts`. This is a directory: it names services, it never ranks them by who pays.
 */
export type ServiceId = "wayhand" | "paymentLinks" | "parentCare" | "travelEscort" | "assistant" | "court";
export type Service = { id: ServiceId; status: "live" | "planned"; url?: string };

export const SERVICES: readonly Service[] = [
    // The address comes from the build settings, so the site can be built before WayHand has a public address.
    { id: "wayhand", status: "live", url: process.env.NEXT_PUBLIC_WAYHAND_URL },
    { id: "paymentLinks", status: "planned" },
    { id: "parentCare", status: "planned" },
    { id: "travelEscort", status: "planned" },
    { id: "assistant", status: "planned" },
    { id: "court", status: "planned" },
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

/** Whether a visitor can open the service: it is live and its address is a web address. */
export const isOpen = (service: Service): boolean => service.status === "live" && isWebAddress(service.url);

export const nameKey = (id: ServiceId) => `service.${id}.name` as MessageKey;
export const descKey = (id: ServiceId) => `service.${id}.desc` as MessageKey;
