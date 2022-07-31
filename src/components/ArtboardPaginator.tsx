import * as React from "react";
import styled from "styled-components";
import Prev from "../assets/arrow-left.svg";
import Next from "../assets/arrow-right.svg";
import { ImgButton } from "./ArtboardViewer";

type Props = {
  onNextItem: (id: number) => void;
  currentIndex: number;
  totalItems: number;
};

const PaginatorLabel = styled.p`
  font-family: -apple-system, BlinkMacSystemFont;
  color: RGBA(0, 0, 0, 0.4);
  font-size: 16px;
  font-weight: 400;
  margin: 0 16px 0 16px;
`;

const ArtboardPaginator = ({ currentIndex, totalItems, onNextItem }: Props) => {
  const eventHandler = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onNextItem(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        onNextItem(currentIndex + 1);
      }
    },
    [onNextItem, currentIndex]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", eventHandler);

    return () => document.removeEventListener("keydown", eventHandler);
  }, [eventHandler]);

  return (
    <>
      <ImgButton
        src={Prev}
        alt="Previous item"
        onClick={() => onNextItem(currentIndex - 1)}
      />
      <PaginatorLabel>{`${currentIndex + 1} / ${totalItems}`}</PaginatorLabel>
      <ImgButton
        src={Next}
        alt="Next item"
        onClick={() => onNextItem(currentIndex + 1)}
      />
    </>
  );
};
export default ArtboardPaginator;
