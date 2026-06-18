"use client";

import BrandLogo from "@/components/ui/BrandLogo";
import { useTranslation } from "@/i18n/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  const footerColumns = [
    {
      title: t("footer.explore"),
      items: [
        [t("footer.linkProduct"), "#product"],
        [t("footer.linkScenes"), "#scenes"],
        [t("footer.linkAudio"), "#spatial-audio"],
      ],
    },
    {
      title: t("footer.about"),
      items: [
        [t("footer.linkFeatures"), "#features"],
        [t("footer.linkGuide"), "#specs"],
        [t("footer.linkPresale"), "#cta"],
      ],
    },
    {
      title: t("footer.channels"),
      items: [
        [t("footer.linkOfficial"), "https://bubbleflow.cn"],
        [t("footer.linkWechat"), "#specs"],
        [t("footer.linkTaobao"), "#specs"],
      ],
    },
  ];

  return (
    <footer className="border-t" style={{ borderColor: "var(--line)", backgroundColor: "var(--surface-3)" }}>
      <div className="section-container py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <BrandLogo size={34} className="h-[34px] w-[34px]" />
              <span className="text-[15px] font-medium" style={{ color: "var(--text-primary)" }}>BubbleFlow</span>
            </div>
            <p className="text-[13px] font-normal leading-[1.7]" style={{ color: "var(--text-tertiary)" }}>
              {t("footer.tagline")}
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 text-[13px] font-medium" style={{ color: "var(--text-secondary)" }}>{column.title}</h2>
              <ul className="space-y-2.5">
                {column.items.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="inline-flex min-h-11 items-center text-[13px] font-normal transition-colors duration-200 md:min-h-0"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 pt-6 text-[11px] md:flex-row md:items-center md:justify-between" style={{ borderTop: "1px solid var(--line)", color: "var(--text-tertiary)" }}>
          <p>{t("footer.copyright")}</p>
          <p>{t("footer.subtitle")}</p>
        </div>
      </div>
    </footer>
  );
}
