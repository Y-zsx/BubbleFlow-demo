import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "汽泡音露 BubbleFlow | 把现场带回家",
  description:
    "汽泡音露 BubbleFlow 通过多个无线声音节点，在家中营造有方向、有距离、有层次的沉浸听觉体验。",
  keywords: ["BubbleFlow", "汽泡音露", "空间音频", "家庭音响", "沉浸式音乐", "无线声场"],
  icons: {
    icon: "/bubbleflow-logo.svg",
    shortcut: "/bubbleflow-logo.svg",
    apple: "/bubbleflow-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={cn("dark h-full antialiased", "font-sans", geist.variable)}>
      <body className="flex min-h-full flex-col bg-[var(--surface-0)] text-[var(--text-primary)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
