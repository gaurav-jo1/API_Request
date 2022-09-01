import React, { useState } from "react";
import { useQuery } from 'react-query'

const fetcher = (repo) => {
  return fetch(`https://api.github.com/repos/${repo}`).then(res => res.json())
}

function App() {
  const [repoName, setRepoName] = useState('')

  const {data, isLoading} = useQuery(['github-data', repoName ], () => fetcher(repoName))

  if(isLoading) return <h2>Loading....</h2>

  return (
    <div>
      <input type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
      <h2>Name: {data.name}</h2>
      <h2>Desc: {data.description}</h2>
      <h2>Login: {data.stargazers_count}</h2>
    </div>
  );
}

export default App;
