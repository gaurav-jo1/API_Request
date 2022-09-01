import React, { useState } from "react";
import { useQuery } from "react-query";
import Post from "./Post";
import client from "./react-query-client";

const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  const [postID, setPostID] = useState(null);

  const { data: posts, isLoading } = useQuery("posts", () =>
    fetcher("https://jsonplaceholder.typicode.com/posts")
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (postID !== null) {
    return (
      <Post postID={postID} goback={() => setPostID(null)} fetcher={fetcher} />
    );
  }
  return (
    <div>
      <h1>Hellow World</h1>
      {posts.map((post) => {
        const cachedPost = client.getQueryData(["post", post.id]);
        return (
          <p key={post.id}>
            <a onClick={() => setPostID(post.id)} href="#0">
              {post.id} {post.title}
            </a>
            {cachedPost ? " ▶️" : null}
          </p>
        );
      })}
    </div>
  );
}

export default App;
