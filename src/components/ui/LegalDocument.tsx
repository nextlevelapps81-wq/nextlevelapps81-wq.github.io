interface LegalDocumentProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: Record<string, { title: string; content: string }>;
}

export function LegalDocument({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <article className="prose-legal">
      <header className="mb-12">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-text-muted">{lastUpdated}</p>
        <p className="mt-6 text-base leading-relaxed text-text-secondary">
          {intro}
        </p>
      </header>

      <div className="space-y-10">
        {Object.entries(sections).map(([key, section]) => (
          <section key={key} id={key}>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary">
              {section.title}
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
              {section.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
