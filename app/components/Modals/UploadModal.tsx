"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";
import axios from "axios";

import Input from "../Input";
import Modal from "./Modal";
import useUploadModal from "@/app/hooks/useUploadModal";
import { supabase } from "@/app/libs/supabaseClient";
import { SafeUser } from "@/app/types";

interface uploadModalProps {
  currentUser: SafeUser | null;
}

const UploadModal: React.FC<uploadModalProps> = ({ currentUser }) => {
  const uploadModal = useUploadModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const songFile = data.song?.[0];
      const imageFile = data.image?.[0];

      if (!imageFile || !songFile || !currentUser) {
        toast.error("Missing Fields");
        return;
      }

      const uniqueId = uniqid();

      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(`song-${data.songTitle}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`image-${data.songTitle}-${uniqueId}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        console.log(imageError);
        return toast.error("Failed image upload");
      }

      await axios
        .post("/api/songs", {
          userId: currentUser.id,
          title: data.songTitle,
          artist: data.artist,
          imagePath: imageData.path,
          songPath: songData.path,
        })
        .catch((err) => console.log(err));

      router.refresh();
      setIsLoading(false);
      toast.success("Song created");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-3 pt-4">
      <Input
        id="songTitle"
        label="Song title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="artist"
        label="Artist"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="song"
        label="upload a song file"
        type="file"
        accept=".mp3"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="image"
        label="upload a thumbnail file"
        type="file"
        accept="image/*"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={uploadModal.isOpen}
      onClose={uploadModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Save"
      title="Upload"
      subtitle="Upload song and thumbnail"
      body={bodyContent}
    />
  );
};

export default UploadModal;
