import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

// Space Grotesk — geometric, high-tech display face (variable)
export const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

// Inter — neutral body / UI (variable)
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// JetBrains Mono — data, kickers, labels (variable)
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jet",
});
