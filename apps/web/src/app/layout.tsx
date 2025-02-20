import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import PlausibleProvider from "next-plausible";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { ClientAnalytics } from "./_components/analytics";
import Background from "./_components/background";

const inter = Inter({ subsets: ["latin"] });

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

const TITLE = "OpenStatus";
const DESCRIPTION =
  "Open-Source uptime monitoring with beautiful status pages.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://www.openstatus.dev"),
  twitter: {
    images: [`/api/og`],
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  openGraph: {
    type: "website",
    images: [`/api/og`],
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If you want to develop locally without Clerk,  Comment the provider below
  return (
    <html lang="en">
      {/* TODO: remove plausible from root layout (to avoid tracking subdomains) */}
      <PlausibleProvider domain="openstatus.dev">
        <ClerkProvider>
          <body className={`${inter.className} ${calSans.variable}`}>
            <Background>{children}</Background>
            <Toaster />
            <TailwindIndicator />
          </body>
        </ClerkProvider>
      </PlausibleProvider>
      <ClientAnalytics />
    </html>
  );
}
