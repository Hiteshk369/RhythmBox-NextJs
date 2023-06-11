"use client";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { SafeUser } from "../types";
import useFavourite from "../hooks/useFavourite";

interface LikeButtonProps {
  songId: string;
  currentUser?: SafeUser | null;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, currentUser }) => {
  const { hasFavourited, toggleFavorite } = useFavourite({
    songId,
    currentUser,
  });

  const Icon = hasFavourited ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer hover:opacity-75 transition"
    >
      <Icon color={hasFavourited ? "#22c55e" : "white"} size={25} />
    </div>
  );
};

export default LikeButton;
