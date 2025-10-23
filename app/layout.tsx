import "./globals.css";
import { Playfair_Display, Lora } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],              
  variable: "--font-display",   
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],              
  variable: "--font-body",      
  display: "swap",
});

export const metadata = {
  title: "Zen Inn Hotel Booking Website",
  description: "A serene and elegant hotel booking platform built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
