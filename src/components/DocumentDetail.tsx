import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { RootQueryType } from "../types";
import Header from "./common/header";
import Main from "./common/main";

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

const DocumentDetail = () => {
  const { data } = useQuery<RootQueryType>(query);

  return (
    <>
      <Header>{data && data.share?.version?.document?.name}</Header>
      <Main>
        {data &&
          data.share?.version?.document?.artboards?.entries.map((atb, idx) => (
            <p key={idx}>{atb.name}</p>
          ))}
      </Main>
    </>
  );
};

export default DocumentDetail;
