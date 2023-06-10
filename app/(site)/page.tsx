import getCurrentUser from "../actions/getCurrentUser";
import Header from "../components/Header";
import ListItem from "../components/ListItem";

export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <div className="bg-[#121212] h-[calc(100%-10%)] rounded-lg w-full overflow-hidden overflow-y-auto">
      <Header currentUser={currentUser}>
        <div className="mb-2">
          <h1 className="text-white md:text-3xl text-2xl font-semibold">
            Welcome Back
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
        </div>
        <div>List of Songs</div>
      </div>
    </div>
  );
}
