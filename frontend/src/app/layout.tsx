import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainHeader from "../components/navigation/main-header";
import { AuthProvider } from "./contexts/auth-ctx";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventEase | Simplify Your Event Management",
  description: "Effortlessly Plan, Organize, and Celebrate with EventEase",
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
        <AuthProvider>
          <MainHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
