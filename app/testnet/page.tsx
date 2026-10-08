import { Networks } from "../../src/components/networks";

export const metadata = {
    title: "Test network · OPUS Portal",
    description: "The test network for trying OPUS services with coins that have no value, with buttons to add it.",
};

export default function TestnetPage() {
    return <Networks test />;
}
