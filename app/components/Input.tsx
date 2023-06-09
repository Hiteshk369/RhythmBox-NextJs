"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={twMerge(
          `w-full
           peer
            px-5
            pt-6 
            py-4
            font-light 
            text-sm
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed`,
          errors[id] ? "border-rose-500" : "border-neutral-800",
          errors[id] ? "focus:border-rose-500" : "focus:border-black"
        )}
      />
      <label
        className={twMerge(
          `absolute 
          text-md
          duration-150 
          transform 
          -translate-y-5
          top-4 
          left-5
          z-[100] 
          origin-[0] 
   
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4`,
          errors[id] ? "text-rose-500" : "text-zinc-400"
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
