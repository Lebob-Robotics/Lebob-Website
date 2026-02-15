import type { Metadata } from "next";
import { Bungee, IBM_Plex_Mono, Manrope, Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const poppins = Sora({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Manrope({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lebob | FLL Robotics Team",
  description:
    "Meet Lebob, an FLL robotics team of 8 builders, coders, and problem solvers exploring creativity, teamwork, and engineering.",
  other: {
    "darkreader-lock": "true",
  },
};

const bodyClasses = [
  spaceGrotesk.variable,
  plexMono.variable,
  poppins.variable,
  inter.variable,
  bungee.variable,
  "antialiased",
].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={bodyClasses}>
        {children}
      </body>
    </html>
  );
}
