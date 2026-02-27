import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nature Cure - Premium Health Supplements",
  description: "High-quality health supplements and nutrition products for your wellness journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
