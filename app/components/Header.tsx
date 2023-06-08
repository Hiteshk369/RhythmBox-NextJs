"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FiHome, FiSearch } from "react-icons/fi";
import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-blue-800 md:px-6 px-4 md:py-5 py-3",
        className
      )}
    >
      <div className="flex w-full items-center justify-between mb-4">
        <div className="hidden md:flex gap-2 items-center">
          <button className="bg-black rounded-full flex items-center justify-center hover:opacity-75 transition">
            <RxCaretLeft size="1.8rem" />
          </button>
          <button className="bg-black rounded-full flex items-center justify-center hover:opacity-75 transition">
            <RxCaretRight size="1.8rem" />
          </button>
        </div>
        <div className="md:hidden flex gap-2 items-center">
          <button className="bg-black w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 transition">
            <FiHome size="1.2rem" />
          </button>
          <button className="bg-black w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 transition">
            <FiSearch size="1.2rem" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-4">
          <>
            <div>
              <Button className="bg-transparent text-neutral-300 font-medium">
                Sign in
              </Button>
            </div>
            <div>
              <Button onClick={() => {}} className="bg-white px-6 py-2">
                Login
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
