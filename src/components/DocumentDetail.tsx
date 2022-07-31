import { ApolloError } from "@apollo/client";
import * as React from "react";
import styled from "styled-components";
import SketchLogo from "../assets/sketch-logo.svg";
import { noArtboard, queryError } from "../constants/errorMessages";
import { RootQueryType } from "../types";
import { isSome } from "../utils/typeHelpers";
import ArtboardThumbnail from "./ArtboardThumbnail";
import ErrorMessage from "./common/ErrorMessage";
import Header from "./common/header";
import Main from "./common/main";

type Props = {
  onThumbnailClick: (id: number) => void;
  data?: RootQueryType;
  error?: ApolloError;
};

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

const DocumentDetail = ({ data, error, onThumbnailClick }: Props) => (
  <>
    <Header>
      <img src={SketchLogo} alt="Sketch Logo" />
      {data && <Title>{data.share?.version?.document?.name}</Title>}
    </Header>
    <Main>
      {error ? (
        <ErrorMessage message={queryError} />
      ) : (
        <ArtboardContainer>
          {data && data?.share?.version?.document?.artboards ? (
            data.share.version.document.artboards.entries.map(
              (atb, idx) =>
                atb.files[0].thumbnails &&
                isSome(atb.files[0].thumbnails) &&
                atb.files[0].thumbnails[0] && (
                  <ArtboardThumbnail
                    key={idx}
                    imgSrc={atb.files[0].thumbnails[0].url}
                    artboardName={atb.name}
                    onClick={() => onThumbnailClick(idx)}
                  />
                )
            )
          ) : (
            <ErrorMessage message={noArtboard} />
          )}
        </ArtboardContainer>
      )}
    </Main>
  </>
);

export default DocumentDetail;
