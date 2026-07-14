import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-24">
      <Container className="text-center">
        <p className="font-display text-8xl font-bold gradient-text">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-text-primary">
          {t("title")}
        </h1>
        <p className="mt-2 text-text-secondary">{t("description")}</p>
        <Link
          href="/"
          className="focus-ring mt-8 inline-flex rounded-full bg-accent-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-purple-dark"
        >
          {t("backHome")}
        </Link>
      </Container>
    </div>
  );
}
