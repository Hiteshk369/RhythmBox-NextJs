import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface FavouriteParams {
  songId: string;
  currentUser?: SafeUser | null;
}

const useFavourite = ({ songId, currentUser }: FavouriteParams) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(songId);
  }, [currentUser, songId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${songId}`);
        } else {
          request = () => axios.post(`/api/favourites/${songId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        console.log(error);
      }
    },
    [currentUser, hasFavourited, songId, loginModal, router]
  );
  return {
    hasFavourited,
    toggleFavorite,
  };
};

export default useFavourite;
