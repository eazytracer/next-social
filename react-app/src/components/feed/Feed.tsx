"use client";

import Post from "./Post";

const Feed = ({ posts, loading }: { posts: any[]; loading: boolean }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        "No posts found!"
      )}
    </div>
  );
};

export default Feed;
