import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BASE_PATH } from "@/lib/constants";

export default function GlobalNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary">
      <Container className="text-center">
        <p className="font-display text-8xl font-bold text-accent-purple">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-text-primary">
          Page Not Found
        </h1>
        <p className="mt-2 text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href={`${BASE_PATH}/en/`}
          className="focus-ring mt-8 inline-flex min-h-12 items-center rounded-full bg-accent-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-purple-dark"
        >
          Back to Home
        </Link>
      </Container>
    </div>
  );
}
