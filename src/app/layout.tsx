import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "D4r1an | Ethical Hacker & Full Stack Developer",
    template: "%s | D4r1an",
  },
  description:
    "Servicii de Penetration Testing, AI Agents, QA Automation și Full Stack Development. Certified ethical hacker pasionat de securitate cibernetică.",
  keywords: [
    "ethical hacking", "penetration testing", "QA automation",
    "full stack developer", "cybersecurity", "AI agents",
    "pentesting Romania", "security consultant",
  ],
  authors: [{ name: "D4r1an" }],
  creator: "D4r1an",
  publisher: "D4r1an",
  metadataBase: new URL("https://darianchirca.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "D4r1an — Ethical Hacker & Developer",
    description: "Pentesting • AI Agents • QA • Full Stack",
    url: "https://darianchirca.com",
    siteName: "D4r1an",
    type: "website",
    locale: "ro_RO",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "D4r1an — Ethical Hacker & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D4r1an — Ethical Hacker & Developer",
    description: "Pentesting • AI Agents • QA • Full Stack",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <div className="scanlines" />
        <div className="bg-grid fixed inset-0 -z-10" />
        {children}
      </body>
    </html>
  );
}
