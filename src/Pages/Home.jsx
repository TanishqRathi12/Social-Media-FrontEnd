import { useEffect, useState, useCallback } from "react";
import PostList from "../Components/PostList";
import LoadingHoc from "../Components/LoadingHocs";
import axios from "../Components/axios";
import InfiniteScroll from "react-infinite-scroll-component";

const PostListWithLoading = LoadingHoc(PostList);

function Home() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setPostLoading(true);
      const response = await axios.get(`/posts?page=${page}`);
      const data = response.data;
      console.log(data)
      setPost((prev) => [...prev, ...data]);
      if (data.length < 5) setHasMore(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setPostLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchNext = () => {
    if (!postLoading && hasMore) setPage((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-3xl mx-auto sm:px-6 md:px-0">
      {loading ? (
        <PostListWithLoading isLoading={loading} posts={[]} hasMore={hasMore} postLoad={postLoading} />
      ) : (
        <InfiniteScroll
          dataLength={post.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<h4 className="text-center py-4 text-gray-300">Loading...</h4>}
          endMessage={
            <p className="text-center py-4 text-gray-500">
              <b>No more posts to show.</b>
            </p>
          }
        >
          <PostList posts={post} hasMore={hasMore} postLoad={postLoading} />
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Home;
