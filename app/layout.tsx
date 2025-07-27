import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartDrive",
  description: "Secure Cloud File Storage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
