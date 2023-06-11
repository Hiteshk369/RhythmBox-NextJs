import prisma from "@/app/libs/prismaDb";
import getSongs from "./getSongs";

const getSongsByTitle = async (title: string) => {
  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const songByTitle = await prisma.song.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!songByTitle) {
    const allSongs = await getSongs();
    return allSongs;
  }

  return songByTitle;
};

export default getSongsByTitle;
