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
  title: "Your App",
  description: "…",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
