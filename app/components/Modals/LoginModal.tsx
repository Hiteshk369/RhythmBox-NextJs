"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Input from "../Input";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
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
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4 pt-4">
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
    <>
      <div className="relative mt-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-[#121212] px-2 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={() => signIn("google")}
          className="flex items-center px-4 py-2  w-full border rounded-md"
        >
          <FcGoogle size={18} />
          <p className="text-center w-full">Continue with Google</p>
        </button>
        <button
          onClick={() => signIn("github")}
          className="flex items-center px-4 py-2  w-full border rounded-md"
        >
          <AiFillGithub size={18} />
          <p className="text-center w-full">Continue with Github</p>
        </button>
        <div className="text-neutral-100 text-center font-light text-sm">
          <p>
            First time using RhythmBox?&nbsp;
            <span
              onClick={onToggle}
              className="text-darkText cursor-pointer hover:underline"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      title="RhythmBox"
      subtitle="Login to RhythmBox to continue listening"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
    />
  );
};

export default LoginModal;
