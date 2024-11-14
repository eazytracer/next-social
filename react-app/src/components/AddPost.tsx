"use client";

import { useUser } from "./UserContext";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { createPost } from "../lib/apiClient";

interface AddPostProps {
  refreshPosts: () => void; // Function to refresh the posts
}

const AddPost = ({ refreshPosts }: AddPostProps) => {
  const { userId, username } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  if (!userId || !username) {
    return "Please sign in to add a post.";
  }

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({
        desc,
        user: {
          id: userId,
          username: username,
        },
      });
      // Refresh the posts after adding a new one
      refreshPosts();
      setDesc("");
      setImg(null);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src={"/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form onSubmit={handleAddPost} className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="">
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            <AddPostButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
