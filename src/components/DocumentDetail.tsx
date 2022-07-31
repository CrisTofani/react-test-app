import * as React from "react";
import styled from "styled-components";
import SketchLogo from "../assets/sketch-logo.svg";
import { noArtboard } from "../constants/errorMessages";
import { RootQueryType } from "../types";
import { isSome } from "../utils/typeHelpers";
import ArtboardThumbnail from "./ArtboardThumbnail";
import ErrorMessage from "./common/ErrorMessage";
import Header from "./common/header";
import Main from "./common/main";
import Separator from "./common/Separator";

type Props = {
  onThumbnailClick: (id: number) => void;
  data?: RootQueryType;
};

const Title = styled.p`
  font-family: Helvetica;
  font-size: 1rem;
  font-weight: 400;
`;

const ArtboardContainer = styled(Main)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const DocumentDetail = ({ data, onThumbnailClick }: Props) => (
  <>
    <Header>
      <img src={SketchLogo} alt="Sketch Logo" />
      <Separator />
      {data && <Title>{data.share?.version?.document?.name}</Title>}
    </Header>
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
  </>
);

export default DocumentDetail;
