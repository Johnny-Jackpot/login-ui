import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const basisGrotesquePro = localFont({
  src: './BasisGrotesquePro-Regular.woff2',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: '%s | Qencode',
    default: 'Qencode'
  },
  description: "Qencode portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${basisGrotesquePro.className} text-main-text`}>{children}</body>
    </html>
  );
}
