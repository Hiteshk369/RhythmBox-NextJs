"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FiHome, FiSearch } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import { signOut } from "next-auth/react";

import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import { SafeUser } from "../types";
import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  currentUser?: SafeUser | null;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className,
  currentUser,
}) => {
  const loginModel = useLoginModal();
  const registerModel = useRegisterModal();

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
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => signOut()}
                    className="bg-emerald-500 px-4 py-[1.5]"
                  >
                    Logout
                  </Button>
                  {currentUser?.image ? (
                    <button className="   hover:opacity-75 transition">
                      <Image
                        className="rounded-full"
                        width={60}
                        height={60}
                        src={currentUser?.image}
                        alt="profile"
                      />
                    </button>
                  ) : (
                    <button className="bg-black w-10 h-10 p-3 rounded-full flex items-center justify-center hover:opacity-75 transition">
                      <BsFillPersonFill size="1.2rem" />
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={loginModel.onOpen}
                      className="bg-emerald-500 px-4 py-[1.5]"
                    >
                      Login
                    </Button>
                    <button className="bg-black w-10 h-10 p-3 rounded-full flex items-center justify-center hover:opacity-75 transition">
                      <BsFillPersonFill size="1.2rem" />
                    </button>
                  </div>
                </>
              )}
            </div>
            <div></div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
