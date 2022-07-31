import { useQuery } from "@apollo/client";
import * as React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SketchLogo from "../assets/sketch-logo.svg";
import { RootQueryType } from "../types";
import { buildQuery } from "../utils/gqlQuery";
import { isSome } from "../utils/typeHelpers";
import ArtboardPreview from "./ArtboardPreview";
import ErrorMessage from "./common/ErrorMessage";
import Header from "./common/header";
import Loader from "./common/loader";
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

type DocumentDetailParams = {
  documentId: string;
};

const DocumentDetail = () => {
  const { documentId } = useParams<keyof DocumentDetailParams>();

  const query = React.useMemo(() => buildQuery(documentId), [documentId]);

  const { data, loading, error } = useQuery<RootQueryType>(query);

  return (
    <>
      <Header>
        <img src={SketchLogo} alt="Sketch Logo" />
        {data && <Title>{data.share?.version?.document?.name}</Title>}
      </Header>
      <Main>
        <ArtboardContainer>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage
              message={`Ooops... Something's wrong while requesting the document :(`}
            />
          ) : data && data?.share?.version?.document?.artboards ? (
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
            )
          ) : (
            <ErrorMessage message={"No artboard found for the document"} />
          )}
        </ArtboardContainer>
      </Main>
    </>
  );
};

export default DocumentDetail;
