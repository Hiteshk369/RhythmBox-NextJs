import getCurrentUser from "../actions/getCurrentUser";
import getSongsByTitle from "../actions/getSongsByTitle";
import Header from "../components/Header";
import SearchContent from "./SearchComponents/SearchContent";
import SearchInput from "./SearchComponents/SearchInput";

export const revalidate = 0;
interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search = async ({ searchParams }: SearchProps) => {
  const currentUser = await getCurrentUser();
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div className="bg-neutral-900 rounded-lg h-[calc(100%-10%)] w-full overflow-clip overflow-y-auto">
      <Header currentUser={currentUser} className="from-bg-[#121212]">
        <div className="flex flex-col mb-2 gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} currentUser={currentUser} />
    </div>
  );
};

export default Search;
