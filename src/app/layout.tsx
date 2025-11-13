import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import NextAuthSessionProvider from "@/lib/NextAuthSessionProvider";
import ReduxProvider from "@/redux/ReduxProvider";
import { Roboto } from "next/font/google";
import PaymentCheckModal from "@/components/PaymentModal";
// import { LanguageInitializer } from "@/utils/translations";



const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose weights you need
});

export const metadata: Metadata = {
  title: "Cleanbubble",
  description: "starter kit for nextjs with redux and redux persist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Toaster position="top-center" richColors />
        <NextAuthSessionProvider>
          <ReduxProvider>
            {/* <LanguageInitializer> */}
            {children}
            {/* </LanguageInitializer> */}
            <PaymentCheckModal></PaymentCheckModal>
          </ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
