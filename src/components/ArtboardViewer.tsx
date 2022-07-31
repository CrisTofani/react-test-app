import * as React from "react";
import styled from "styled-components";
import Close from "../assets/close.svg";
import { Artboard, Maybe } from "../types";
import { isSomeDefined } from "../utils/typeHelpers";
import ArtboardPaginator from "./ArtboardPaginator";
import Header from "./common/header";
import Main from "./common/main";
import Separator from "./common/Separator";

type Props = {
  onClose: () => void;
  currentAtb: number;
  artboards: ReadonlyArray<Artboard>;
  onChangeArtboard: (id: number) => void;
};

export const ImgButton = styled.img`
  cursor: pointer;
`;

const Title = styled.p`
  position: fixed;
  z-index: 2;
  width: 250px;
  text-align: center;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  font-family: -apple-system, BlinkMacSystemFont;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
`;

const ArtboardImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 16px;
`;

const ArtboardViewer = ({
  artboards,
  currentAtb,
  onClose,
  onChangeArtboard
}: Props) => {
  const [imgUrl, setImgUrl] = React.useState<Maybe<string>>();
  const selectedArtboard = React.useMemo<Artboard>(
    () => artboards[currentAtb],
    [currentAtb, artboards]
  );

  const imgContainer = React.useCallback(
    (elem: HTMLDivElement | null) => {
      if (elem !== null) {
        const files = selectedArtboard.files;
        const containerW = elem.offsetWidth;
        const containerH = elem.offsetHeight;

        const imgToFit = files.find(
          f =>
            f.height &&
            f.width &&
            containerH >= f.height &&
            containerW >= f.width
        );

        setImgUrl(imgToFit && imgToFit.url ? imgToFit.url : files[0].url);
      }
    },
    [selectedArtboard]
  );

  const moveToNextAtb = React.useCallback(
    (nextId: number) => {
      if (nextId > artboards.length - 1 || nextId < 0) {
        return;
      }
      onChangeArtboard(nextId);
    },
    [artboards, onChangeArtboard]
  );

  return (
    <>
      <Header>
        <ImgButton src={Close} alt="Close icon" onClick={() => onClose()} />
        <Separator />
        <ArtboardPaginator
          currentIndex={currentAtb}
          totalItems={artboards.length}
          onNextItem={moveToNextAtb}
        />
        <Title>{selectedArtboard.name}</Title>
      </Header>
      <Main>
        <Container ref={imgContainer}>
          {isSomeDefined(imgUrl) && (
            <ArtboardImg src={imgUrl} alt={selectedArtboard.name} />
          )}
        </Container>
      </Main>
    </>
  );
};

export default ArtboardViewer;
