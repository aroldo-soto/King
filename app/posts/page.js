import Link from "next/link";

const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  return response.json();
};

const Posts = async () => {
  const post = await getPosts();

  return (
    <div>
      <h3>Posts:</h3>
      <ul>
        {post.map((post) => {
          return (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <li>{post.title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
