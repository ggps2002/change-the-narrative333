import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Change the Narrative",
  description:
    "Centering People. Building Access. Driven by Justice. Non-profit organization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">
            <ClientLayout>{children}</ClientLayout>
          </div>
        </div>

        <Toaster
          toastOptions={{
            classNames: {
              toast:
                "bg-white !bg-white text-black border border-gray-200 shadow-md !backdrop-blur-none !bg-opacity-100",
              title: "text-base font-semibold",
              description: "text-sm",
              actionButton: "bg-accent text-white",
            },
          }}
        />
      </body>
    </html>
  );
}
