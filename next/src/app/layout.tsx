import type { Metadata } from "next";
import localFont from "next/font/local";
import { MeshProviderApp } from "../providers/meshProvider";
import "./globals.css";
import "@meshsdk/react/styles.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "📜 Tartarus",
  description: "Proof of Merit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <MeshProviderApp>{children}</MeshProviderApp>
      </body>
    </html>
  );
}
