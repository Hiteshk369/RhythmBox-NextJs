"use client";

import { Song } from "@prisma/client";
import { SafeSongs, SafeUser } from "../../types";
import MediaItem from "../../components/MediaItem";
import LikeButton from "../../components/LikeButton";

interface LikedContentProps {
  likedSongs?: SafeSongs[];
  currentUser?: SafeUser | null;
}

const LikedContent: React.FC<LikedContentProps> = ({
  likedSongs,
  currentUser,
}) => {
  if (!currentUser) {
    return;
  }
  if (likedSongs?.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        <p>No liked songs</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {likedSongs?.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem data={song} />
          </div>
          <LikeButton songId={song.id} currentUser={currentUser} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
