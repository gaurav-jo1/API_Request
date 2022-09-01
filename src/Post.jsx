import React from "react";
import { useQuery } from "react-query";

const Post = ({ postID, goback, fetcher }) => {
  const { data, isLoading } = useQuery(["post", postID], () =>
    fetcher(`https://jsonplaceholder.typicode.com/posts/${postID}`)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <a onClick={goback} href="#0">
        Go Back
      </a>
    </div>
  );
};

export default Post;
