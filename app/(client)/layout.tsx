import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "../providers";

export const metadata: Metadata = {
  title: {
    template: "%s - gemselenit online store",
    default: "gemselenit online store",
  },
  description: "gemselenit online store, Your one stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Providers>
          <main>{children}</main>
        </Providers>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
