import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import client from "./react-query-client";

const fetcher = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

function App() {
  const [tempLang, setTempLang] = useState(' ')
  const mutation = useMutation((body) => fetcher(`/api/create-record`, body), {
    onSuccess(data) {
      console.log("Got response from backend", data)
      client.invalidateQueries('favLangs')
    },
    onError(error) {
      console.log("Got error from backend", error);
    },
  });

  const { data: favLangs, isLoading, isError, } = useQuery("favLangs", () => {
    return fetch("/api/get-records").then((t) => t.json());
  });

  function callMutation() {
    mutation.mutate({ record: tempLang});
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error with request</p>;
  }
  return (
    <div>
      <h1>Some fav languages</h1>
      {favLangs.map((lang) => {
        return <li key={lang}>{lang}</li>;
      })}
      <input type="text" name="languages" value={tempLang} onChange={e => setTempLang(e.target.value)} />
      <button onClick={callMutation}>Click me</button>
    </div>
  );
}

export default App;
