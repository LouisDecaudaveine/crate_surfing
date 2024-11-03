import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


const notoMono = localFont({
  src: "./fonts/NotoSansMono.ttf",
  variable: "--font-noto-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Crate Surfing",
  description: "Stream your rekordbox library anywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoMono.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
