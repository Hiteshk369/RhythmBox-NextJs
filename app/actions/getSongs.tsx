import prisma from "@/app/libs/prismaDb";

const getSongs = async () => {
  const songs = await prisma.song.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!songs) {
    console.log("error retrieving songs");
  }

  return songs;
};

export default getSongs;
