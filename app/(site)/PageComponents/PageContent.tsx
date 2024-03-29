"use client";

import { Song } from "@prisma/client";
import SongItem from "./SongItem";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        <p>No songs available</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid:cols-5 gap-4 mt-4">
      {songs.map((item) => (
        <SongItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default PageContent;
