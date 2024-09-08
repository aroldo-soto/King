const getPostById = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed getting post");
  }

  return response.json();
};

const PostDetail = async ({ params }) => {
  const { id } = params;
  const post = await getPostById(id);

  return (
    <div>
      {post.title}
      {post.body}
    </div>
  );
};

export default PostDetail;
