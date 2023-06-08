"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FiHome, FiSearch, FiPlus } from "react-icons/fi";
import { TbPlaylist } from "react-icons/tb";
import { IconType } from "react-icons";
import Box from "./Box";
import Library from "./Library";

interface SidebarProps {
  children: React.ReactNode;
  Icon?: IconType;
  label?: string;
  active?: boolean;
  href?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        Icon: FiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        Icon: FiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex h-full w-[300px] flex-col gap-y-2 p-2 ">
        <Box>
          <div className="flex flex-col gap-y-5 px-5 py-5">
            {routes.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-5 text-neutral-300 font-semibold cursor-pointer hover:text-neutral-50 transition hover:duration-150 tracking-wide"
              >
                <item.Icon size="1.4rem" />
                <p className="text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </Box>
        <Box className="h-[calc(100%-30%)] overflow-y-auto">
          <div className="flex flex-col px-5 py-4 gap-y-5">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center text-neutral-300 font-semibold cursor-pointer hover:text-neutral-50 transition hover:duration-150 tracking-wide">
                <TbPlaylist size="1.4rem" />
                <p>Your Library</p>
              </div>
              <div className="text-neutral-300 cursor-pointer hover:text-neutral-50 transition hover:duration-150 ">
                <FiPlus size="1.4rem" />
              </div>
            </div>
            <Library />
          </div>
        </Box>
      </div>
      <main className="w-full pr-2 py-2  md:pl-0 pl-2">{children}</main>
    </div>
  );
};

export default Sidebar;
