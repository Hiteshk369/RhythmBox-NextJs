import { supabase } from "../libs/supabaseClient";
import { Song } from "@prisma/client";

const useLoadImage = (song: Song) => {
  if (!song) {
    return null;
  }

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.imagePath as string);

  return imageData.publicUrl;
};

export default useLoadImage;
