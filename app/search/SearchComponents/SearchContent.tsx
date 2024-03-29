"use client";

import { Song } from "@prisma/client";
import MediaItem from "../../components/MediaItem";
import LikeButton from "../../components/LikeButton";
import { SafeSongs, SafeUser } from "../../types";

interface SearchContentProps {
  songs?: SafeSongs[] | Song[];
  currentUser?: SafeUser | null;
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs,
  currentUser,
}) => {
  if (songs?.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        <p>No songs found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs?.map((song) => (
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

export default SearchContent;
