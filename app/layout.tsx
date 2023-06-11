import { Figtree } from "next/font/google";

import Sidebar from "./components/SidebarComponents/Sidebar";
import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";

import UploadModal from "./components/Modals/UploadModal";
import getCurrentUser from "./actions/getCurrentUser";
import getSongs from "./actions/getSongs";

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
  const songs = await getSongs();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <UploadModal currentUser={currentUser} />
        <Sidebar currentUser={currentUser} songs={songs}>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
