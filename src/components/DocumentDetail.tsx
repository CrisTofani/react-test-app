import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SketchLogo from "../assets/sketch-logo.svg";
import { RootQueryType } from "../types";
import { isSome } from "../utils/typeHelpers";
import ArtboardPreview from "./ArtboardPreview";
import Header from "./common/header";
import Main from "./common/main";

const Title = styled.p`
  font-family: Helvetica;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 48px;
`;

const ArtboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 24px;
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
        <ArtboardContainer>
          {data &&
            data.share &&
            data.share.version &&
            data.share.version.document &&
            data.share.version.document.artboards &&
            data.share.version.document.artboards.entries.map(
              (atb, idx) =>
                atb.files[0].thumbnails &&
                isSome(atb.files[0].thumbnails) &&
                atb.files[0].thumbnails[0] && (
                  <ArtboardPreview
                    key={idx}
                    imgSrc={atb.files[0].thumbnails[0].url}
                    artboardName={atb.name}
                  />
                )
            )}
        </ArtboardContainer>
      </Main>
    </>
  );
};

export default DocumentDetail;
