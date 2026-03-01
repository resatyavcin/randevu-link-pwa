import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeSync } from "@/components/theme-sync";
import { OrientationLock } from "@/components/orientation-lock";
import { SerwistProvider } from "./serwist-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_NAME = "Randevu Link";
const APP_DESCRIPTION = "Randevu Link PWA Uygulaması";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: APP_DESCRIPTION,
  appleWebApp: { capable: true, statusBarStyle: "default", title: APP_NAME },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SerwistProvider swUrl="/serwist/sw.js">
          <ThemeSync />
          <OrientationLock />
          <QueryProvider>
          <div data-vaul-drawer-wrapper className="min-h-screen">
            {children}
          </div>
        </QueryProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
