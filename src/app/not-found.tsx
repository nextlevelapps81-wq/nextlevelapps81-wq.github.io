import { Container } from "@/components/ui/Container";

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
        <a
          href="/en/"
          className="mt-8 inline-flex rounded-full bg-accent-purple px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Home
        </a>
      </Container>
    </div>
  );
}
