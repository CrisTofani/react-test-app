import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SketchLogo from "../assets/sketch-logo.svg";
import { RootQueryType } from "../types";
import Header from "./common/header";
import Main from "./common/main";

const Title = styled.p`
  font-family: Helvetica;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 48px;
`;

export type DocumentDetailParams = {
  documentId: string;
};

const buildQuery = (documentId?: string) => gql`
  {
    share(id: "${documentId}") {
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
  const { documentId } = useParams<keyof DocumentDetailParams>();

  const query = React.useMemo(() => buildQuery(documentId), [documentId]);

  const { data } = useQuery<RootQueryType>(query);

  return (
    <>
      <Header>
        <img src={SketchLogo} alt="Sketch Logo" />
        {data && <Title>{data.share?.version?.document?.name}</Title>}
      </Header>
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
