import Image from "next/image";

import getLikedSongs from "../actions/getLikedSongs";
import getCurrentUser from "../actions/getCurrentUser";

import Header from "../components/Header";
import LikedContent from "./LikedComponents/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  const likedSongs = await getLikedSongs();
  const currentUser = await getCurrentUser();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-scroll scrollbar-hide">
      <Header currentUser={currentUser}>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row item-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                src="/images/liked.png"
                alt="Liked"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent likedSongs={likedSongs} currentUser={currentUser} />
    </div>
  );
};

export default Liked;
