"use client";

import { Fragment } from "react";
import { Link } from "@/i18n/navigation";

interface LegalDocumentProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: Record<string, { title: string; content: string }>;
  privacyPolicyLinkLabel?: string;
  deleteAccountLinkLabel?: string;
}

const PRIVACY_LINK_PLACEHOLDER = "{privacyPolicyLink}";
const DELETE_ACCOUNT_LINK_PLACEHOLDER = "{deleteAccountLink}";

function renderContentWithLegalLinks(
  content: string,
  privacyPolicyLinkLabel?: string,
  deleteAccountLinkLabel?: string
) {
  const hasPrivacyLink =
    privacyPolicyLinkLabel && content.includes(PRIVACY_LINK_PLACEHOLDER);
  const hasDeleteAccountLink =
    deleteAccountLinkLabel && content.includes(DELETE_ACCOUNT_LINK_PLACEHOLDER);

  if (!hasPrivacyLink && !hasDeleteAccountLink) {
    return content;
  }

  const splitPattern = new RegExp(
    `(${PRIVACY_LINK_PLACEHOLDER.replace(/[{}]/g, "\\$&")}|${DELETE_ACCOUNT_LINK_PLACEHOLDER.replace(/[{}]/g, "\\$&")})`
  );
  const parts = content.split(splitPattern);

  return parts.map((part, index) => {
    if (part === PRIVACY_LINK_PLACEHOLDER && privacyPolicyLinkLabel) {
      return (
        <Link
          key={index}
          href="/privacy"
          className="font-medium text-accent-purple underline underline-offset-2 transition-colors hover:text-accent-purple-dark"
        >
          {privacyPolicyLinkLabel}
        </Link>
      );
    }

    if (part === DELETE_ACCOUNT_LINK_PLACEHOLDER && deleteAccountLinkLabel) {
      return (
        <Link
          key={index}
          href="/delete-account"
          className="font-medium text-accent-purple underline underline-offset-2 transition-colors hover:text-accent-purple-dark"
        >
          {deleteAccountLinkLabel}
        </Link>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function LegalDocument({
  title,
  lastUpdated,
  intro,
  sections,
  privacyPolicyLinkLabel,
  deleteAccountLinkLabel,
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
                  {renderContentWithLegalLinks(
                    paragraph,
                    privacyPolicyLinkLabel,
                    deleteAccountLinkLabel
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
