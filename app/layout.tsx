import "@/lib/suppress-url-parse-warning";
import "./globals.css";
import { LoadingProvider } from "@/contexts/loading-context";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata = {
  title: "Zen Inn Hotel Booking Website",
  description: "A serene and elegant hotel booking platform built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
