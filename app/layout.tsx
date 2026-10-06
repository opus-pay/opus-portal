import type { ReactNode } from "react";

import { Providers } from "../src/components/providers";
import "./globals.css";

export const metadata = {
    title: "OPUS Portal",
    description: "A directory of services built on OPUS escrow.",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
