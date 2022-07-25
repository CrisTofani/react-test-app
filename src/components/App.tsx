import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import logo from "../assets/logo.svg";
import "./App.css";

const query = gql`
  {
    share(id: "e981971c-ff57-46dc-a932-a60dc1804992") {
      identifier
      version {
        document {
          name
          artboards {
            entries {
              name
              isArtboard
              files {
                url
                height
                width
                scale
                thumbnails {
                  url
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  }
`;
function App() {
  const { loading, data, error } = useQuery(query);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {loading && <p>loading...</p>}
        {error && <p>{`there's an error!`}</p>}
        {data && <p>{JSON.stringify(data)}</p>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
