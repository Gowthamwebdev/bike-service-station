import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import GlobalProvider from "../context/GlobalProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bike Station",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Providers>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Toaster position="bottom-right" />
            <footer className="text-center py-4 text-sm w-full p-4 mb-4 bottom-0 dark:bg-gray-900 dark:text-white">
           <p className="text-xl font-serif">A <span className="font-semibold">GowthamWebdev</span> project</p>
          </footer>
          </Providers>
        </GlobalProvider>
      </body>
    </html>
  );
}
