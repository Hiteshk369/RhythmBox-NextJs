"use client";

import { Song } from "@prisma/client";
import MediaItem from "../MediaItem";

interface LibraryProps {
  songs?: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  return (
    <div className="flex flex-col gap-y-1">
      {songs?.map((item) => (
        <MediaItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Library;
