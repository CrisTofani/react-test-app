import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SketchLogo from "../assets/sketch-logo.svg";
import { documentsIds } from "../constants/documents";
import Header from "./common/header";
import Main from "./common/main";

const Container = styled(Main)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-family: Helvetica;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 48px;
`;

const StyledLink = styled(Link)`
  padding: 8px;
`;
const DocumentsHome = () => (
  <>
    <Header>
      <img src={SketchLogo} alt="Sketch Logo" />
      <Title>Choose the document</Title>
    </Header>
    <Container>
      {documentsIds.map(documentId => (
        <StyledLink to={documentId} key={documentId}>
          {documentId}
        </StyledLink>
      ))}
    </Container>
  </>
);

export default DocumentsHome;
