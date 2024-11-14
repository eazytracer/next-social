"use client";

import { useState, useEffect } from "react";
import AddPost from "@/components/AddPost";
import Feed from "@/components/feed/Feed";
import { fetchPosts } from "@/lib/apiClient";

const Homepage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to load posts
  const loadPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        {/* Add left menu if needed */}
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <AddPost refreshPosts={loadPosts} />
          <Feed posts={posts} loading={loading} />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        {/* Add any other components */}
      </div>
    </div>
  );
};

export default Homepage;
