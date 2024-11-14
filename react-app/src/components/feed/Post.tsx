import Image from "next/image";
// import Comments from "./Comments";
// import PostInteraction from "./PostInteraction";
import { Suspense } from "react";
import PostInfo from "./PostInfo";

// Type definitions for Post and User
interface UserType {
  id: string;
  username: string;
}

interface PostType {
  id: number;
  desc: string;
  img?: string;
  user: UserType;
  likes: { userId: string }[];
  _count: { comments: number };
}

type FeedPostType = PostType;

const Post = ({ post }: { post: FeedPostType }) => {
  const userId = "user123"; // Replace this with actual logic to get the current user ID

  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/noAvatar.png"
            width={40}
            height={40}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">
            {post.user.username}
          </span>
        </div>
        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              fill
              className="object-cover rounded-md"
              alt=""
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* INTERACTION */}
      {/* <Suspense fallback="Loading...">
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>
      <Suspense fallback="Loading...">
        <Comments postId={post.id} />
      </Suspense> */}
    </div>
  );
};

export default Post;
