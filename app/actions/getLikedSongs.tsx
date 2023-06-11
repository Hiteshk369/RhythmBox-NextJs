import prisma from "@/app/libs/prismaDb";
import getCurrentUser from "./getCurrentUser";

const getLikedSongs = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }

  const favourites = await prisma.song.findMany({
    where: {
      id: {
        in: [...(currentUser.favouriteIds || [])],
      },
    },
  });

  const likedSongs = favourites.map((favourite) => ({
    ...favourite,
    createdAt: favourite.createdAt.toISOString(),
  }));

  return likedSongs;
};

export default getLikedSongs;
