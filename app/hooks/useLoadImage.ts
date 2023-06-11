import { Song } from "@prisma/client";
import { supabase } from "../libs/supabaseClient";
import { SafeSongs } from "../types";

const useLoadImage = (song: SafeSongs | Song) => {
  if (!song) {
    return null;
  }

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.imagePath as string);

  return imageData.publicUrl;
};

export default useLoadImage;
