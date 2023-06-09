import { Figtree } from "next/font/google";

import Sidebar from "./components/Sidebar";
import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import Provider from "./providers/SessionProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "RhythmBox",
  description: "A music web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Provider>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Sidebar>{children}</Sidebar>
        </Provider>
      </body>
    </html>
  );
}
