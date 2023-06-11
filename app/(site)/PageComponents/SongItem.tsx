"use client";

import Image from "next/image";

import { Song } from "@prisma/client";
import useLoadImage from "../../hooks/useLoadImage";
import { FaPlay } from "react-icons/fa";

interface SongItemProps {
  data: Song;
}

const SongItem: React.FC<SongItemProps> = ({ data }) => {
  const imagePath = useLoadImage(data);

  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          alt="thumbnail"
          fill
          sizes="100vw"
        />
        <div className="absolute bottom-2 right-2 transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md  group-hover:opacity-100  hover:scale-110">
          <FaPlay className="text-black" />
        </div>
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          By {data.artist}
        </p>
      </div>
    </div>
  );
};

export default SongItem;
