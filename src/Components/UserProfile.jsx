import { Link } from "react-router-dom";
import CreateButton from "./CreateButton";
import Delete from "./deleteButton";
import EditButton from "./EditPost";

const UserProfile = ({ userData, posts, user }) => {
  const filteredPosts = posts.filter((post) => post.author._id === user);
  return (
    <>
      <div className="h-full dark:bg-gray-800 bg-gray-200 pt-12 pb-8">
        <h1 className="text-xl font-semibold text-center text-gray-800 pt-7 dark:text-white mb-8">
          Following and Followers feature coming soon globally!
        </h1>
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-md">
            <img
              className="h-40 w-40 rounded-full border-4 border-white dark:border-gray-800 mb-4"
              src={userData.image}
              alt="User Profile"
            />
            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-2">
              {userData.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-center mb-4">
              {userData.Bio}
            </p>
            <div className="flex gap-4 mb-4">
              <button className="rounded-full bg-green-600 dark:bg-green-800 text-white font-bold hover:bg-green-700 dark:hover:bg-green-900 px-4 py-2">
                Followers ({userData.followerCount.length})
              </button>
              <button className="rounded-full bg-purple-600 dark:bg-purple-800 text-white font-bold hover:bg-purple-700 dark:hover:bg-purple-900 px-4 py-2">
                Following ({userData.followingCount.length})
              </button>
            </div>
            <Link to="/EditUser">
              <button className="rounded-full bg-blue-600 dark:bg-blue-800 text-white font-bold hover:bg-blue-700 dark:hover:bg-blue-900 px-6 py-2">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
        <div className="sm:ml-80  m-5">
          <CreateButton />
        </div>

        <div className="sm:ml-80 flex flex-col mx-auto px-4 mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            My Posts
          </h2>
          {filteredPosts.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">
              No posts yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={post.image}
                    alt="User Post"
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
                      {post?.caption || "Untitled Post"}
                    </h1>
                    <div className="flex justify-between mt-4">
                      <button className="flex-1 bg-red-500 text-white font-bold py-2 mx-2 rounded-lg transition duration-300 hover:bg-red-600">
                        <Delete id={post._id} />
                      </button>
                      <button className="flex-1 bg-blue-500 text-white font-bold py-2 mx-2 rounded-lg transition duration-300 hover:bg-blue-600">
                        <EditButton id={post._id} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
