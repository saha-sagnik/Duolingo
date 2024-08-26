import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ExitModel } from "@/components/modals/exit-model";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LingoWiz",
  description: "Learn and speak new languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
     
    <html lang="en">
      <body className={font.className}>
      <Toaster/>
      <ExitModel/>
      {children}</body>
    </html>
    </ClerkProvider>
  );
}
