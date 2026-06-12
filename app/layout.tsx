import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-project.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Someshwar Joshi | SWE, Backend & Applied AI Portfolio",
    template: "%s | Someshwar Joshi",
  },
  description:
    "3rd-year CSE undergrad at VNR VJIET interested in backend systems, applied AI, security-focused workflows, and Summer 2027 SWE internships.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Someshwar Joshi | SWE, Backend & Applied AI Portfolio",
    description:
      "Portfolio of Someshwar Joshi, a 3rd-year CSE undergrad focused on backend systems, applied AI, security, and product engineering.",
    url: "/",
    siteName: "Someshwar Joshi Portfolio",
    images: [
      {
        url: "/images/SomeshwarJoshi-Profile.jpeg",
        width: 1246,
        height: 1246,
        alt: "Someshwar Joshi portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Someshwar Joshi | SWE, Backend & Applied AI Portfolio",
    description:
      "Backend, applied AI, security, and product engineering portfolio for Summer 2027 internship opportunities.",
    images: ["/images/SomeshwarJoshi-Profile.jpeg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
