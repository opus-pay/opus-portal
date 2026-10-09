"use client";

import type { ReactNode } from "react";

import { LocaleProvider } from "./locale";

/** The Portal holds no wallet connection: the only state shared by every page is the reader's language. */
export function Providers({ children }: { children: ReactNode }) {
    return <LocaleProvider>{children}</LocaleProvider>;
}
