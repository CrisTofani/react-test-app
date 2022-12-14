import * as React from "react";
import styled from "styled-components";
import { Maybe } from "../types";
import { isSomeDefined } from "../utils/typeHelpers";

type Props = {
  imgSrc?: Maybe<string>;
  artboardName: string;
  onClick: () => void;
};

const Container = styled.div`
  height: 335px;
  width: 288px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 8px 24px 8px;
  margin-right: auto;
  cursor: pointer;
`;

const ArtboardName = styled.p`
  margin: 0px;
  font-family: -apple-system, BlinkMacSystemFont;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.429;
  color: #000000;
  opacity: 68%;
  padding-top: 16px;
`;

const Thumbnail = styled.img`
  display: flex;
  margin: auto;
  max-width: 240px;
  max-height: 305px;
`;

const ArtboardThumbnail = (props: Props) => (
  <Container onClick={() => props.onClick()}>
    {isSomeDefined(props.imgSrc) && (
      <Thumbnail src={props.imgSrc} alt={`${props.artboardName}_thumbnail`} />
    )}
    <ArtboardName>{props.artboardName}</ArtboardName>
  </Container>
);

export default ArtboardThumbnail;
