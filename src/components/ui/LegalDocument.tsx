"use client";

import { Fragment } from "react";
import { Link } from "@/i18n/navigation";

interface LegalDocumentProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: Record<string, { title: string; content: string }>;
  privacyPolicyLinkLabel?: string;
}

const PRIVACY_LINK_PLACEHOLDER = "{privacyPolicyLink}";

function renderContentWithPrivacyLink(
  content: string,
  privacyPolicyLinkLabel?: string
) {
  if (
    !privacyPolicyLinkLabel ||
    !content.includes(PRIVACY_LINK_PLACEHOLDER)
  ) {
    return content;
  }

  const parts = content.split(PRIVACY_LINK_PLACEHOLDER);
  return parts.map((part, index) => (
    <Fragment key={index}>
      {part}
      {index < parts.length - 1 ? (
        <Link
          href="/privacy"
          className="font-medium text-accent-purple underline underline-offset-2 transition-colors hover:text-accent-purple-dark"
        >
          {privacyPolicyLinkLabel}
        </Link>
      ) : null}
    </Fragment>
  ));
}

export function LegalDocument({
  title,
  lastUpdated,
  intro,
  sections,
  privacyPolicyLinkLabel,
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
                  {renderContentWithPrivacyLink(
                    paragraph,
                    privacyPolicyLinkLabel
                  )}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
