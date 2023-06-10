import { Figtree } from "next/font/google";

import Sidebar from "./components/Sidebar";
import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import Provider from "./providers/SessionProvider";
import UploadModal from "./components/Modals/UploadModal";
import getCurrentUser from "./actions/getCurrentUser";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "RhythmBox",
  description: "A music web application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <UploadModal />
        <Sidebar currentUser={currentUser}>{children}</Sidebar>
      </body>
    </html>
  );
}
