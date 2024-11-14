"use client";

import { deletePost } from "../../lib/apiClient";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);

  const deletePostWithId = async () => {
    try {
      await deletePost(postId);
      // You could implement a callback here to refresh posts or notify the parent component
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="relative">
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt=""
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute top-4 right-0 bg-white p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Re-post</span>
          <button onClick={deletePostWithId} className="text-red-500">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
