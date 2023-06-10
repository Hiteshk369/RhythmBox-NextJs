"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange?: () => void;
  title?: string;
  subtitle?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  subtitle,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-center fixed bg-neutral-800/80 overflow-x-hidden md:overflow-y-auto overflow-y-hidden   inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full md:w-4/6 lg:w-3/6 my-6 mx-auto h-full md:h-[90%] md:overflow-y-scroll scrollbar-hide">
          <div
            className={twMerge(
              "translate h-full duration-300",
              showModal ? "translate-y-0" : "translate-y-full",
              showModal ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#121212] outline-none focus:outline-non">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px] border-b-gray-800">
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={handleClose}
                >
                  <IoMdClose className="text-darkText" size={18} />
                </button>
                <div className="text-lg font-semibold text-darkHeading tracking-widest">
                  {title}
                </div>
              </div>
              <div className="relative pt-4 p-6 flex-auto">
                <div className="flex items-center justify-center text-sm tracking-wide">
                  <p>{subtitle}</p>
                </div>
                {body}
              </div>
              <div className="flex flex-col gap-2 pt-0 p-6">
                <div className="flex flex-row items-center w-full">
                  <div className="flex flex-col w-full space-y-6">
                    <button
                      className={twMerge(
                        "w-full bg-gradient-to-r from-emerald-400 to-emerald-600 border-emerald-600 text-black font-semibold border py-2 rounded-lg relative transition hover:opacity-80",
                        disabled && "cursor-not-allowed opacity-70"
                      )}
                      disabled={disabled}
                      onClick={handleSubmit}
                    >
                      {actionLabel}
                    </button>
                  </div>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
