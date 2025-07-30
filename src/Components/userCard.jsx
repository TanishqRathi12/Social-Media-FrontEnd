const UserCard = ({ user, onToggleFollow, followActionLoading }) => {
  return (
    <div
      className="bg-gray-900/90 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition group"
      style={{ minHeight: 350 }}
    >
      <div className="relative group-hover:scale-[1.05] transition-transform">
        <img
          src={user.ProfilePicture || '/user_png.png'}
          alt={`${user.username}'s profile`}
          className="w-24 h-24 rounded-full object-cover border-4 border-sky-500 shadow-lg group-hover:border-blue-600"
        />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-white truncate max-w-[10rem]">{user.username}</h3>
      <p className="mt-2 text-gray-400 text-sm px-2 max-h-16 overflow-y-auto" title={user?.Bio || 'None'}>
        {user?.Bio || <span className="italic text-gray-600">No bio</span>}
      </p>

      <div className="flex gap-4 mt-4 text-white">
        <span>
          <span className="font-semibold text-blue-400">Followers:</span>{" "}
          {user?.followers?.length ?? '0'}
        </span>
        <span>
          <span className="font-semibold text-blue-400">Following:</span>{" "}
          {user?.following?.length ?? '0'}
        </span>
      </div>

      <button
        disabled={followActionLoading === user._id}
        onClick={() => onToggleFollow(user._id, user.isFollowed)}
        className={`
          mt-6 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-md
          transition-colors duration-200 outline-none focus:ring-2 focus:ring-blue-500
          ${user.isFollowed
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"}
          ${followActionLoading === user._id ? "opacity-50 cursor-wait" : ""}
        `}
      >
        {followActionLoading === user._id
          ? 'Please wait...'
          : user.isFollowed ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default UserCard;
