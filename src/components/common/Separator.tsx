import * as React from "react";
import styled from "styled-components";
import SeparatorAsset from "../../assets/separator.svg";

const StyledImg = styled.img`
  padding: 16px;
`;

const Separator = () => <StyledImg src={SeparatorAsset} alt="Separator" />;

export default Separator;
