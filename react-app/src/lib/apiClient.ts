let posts: any[] = []; // Temporary in-memory store for posts

export const fetchPosts = async (username?: string, userId?: string) => {
    // Simulate a delay to mimic an API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Fetching posts: ", posts); // Log the current state of posts
    return posts;
};

// Add more methods here for other endpoints like creating posts, fetching comments, etc.
export const createPost = async (postData: { desc: string, user: { id: string, username: string } }) => {
    // Simulate a delay to mimic an API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Simulate creating a post and adding it to the in-memory store
    const newPost = {
        id: posts.length + 1, // Generate a simple ID for the new post
        ...postData,
        createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost); // Add to the beginning of the posts array
    console.log("Post created: ", newPost); // Log the newly created post
    console.log("Updated posts: ", posts); // Log the updated state of posts
    return newPost;
};

export const deletePost = async (postId: number) => {
    // Simulate a delay to mimic an API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Remove the post from the in-memory store
    posts = posts.filter((post) => post.id !== postId);
    console.log("Post deleted with ID: ", postId); // Log the deleted post ID
    console.log("Updated posts after delete: ", posts); // Log the updated state of posts
};

// Method to sign up or sign in a user (stubbed)
export const signupUser = async (username: string) => {
    // Simulate a delay to mimic an API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Return a dummy user ID for now
    return { id: "1234", username };
};
