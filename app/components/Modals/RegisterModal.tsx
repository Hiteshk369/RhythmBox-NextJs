"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import axios from "axios";
import Modal from "./Modal";
import Input from "../Input";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { toast } from "react-hot-toast";

const RegisterModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("User Registered!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-3 pt-4">
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-3 mt-2">
      <button className="flex items-center px-4 py-2  w-full border rounded-md">
        <FcGoogle size={18} />
        <p className="text-center w-full">Continue with Google</p>
      </button>
      <button className="flex items-center px-4 py-2  w-full border rounded-md">
        <AiFillGithub size={18} />
        <p className="text-center w-full">Continue with Github</p>
      </button>
      <div className="text-neutral-100 text-center font-light text-sm">
        <p>
          Already have an account?&nbsp;
          <span
            onClick={onToggle}
            className="text-darkText cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      title="RhythmBox"
      subtitle="Sign up to RhythmBox to continue listening"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
    />
  );
};

export default RegisterModal;
