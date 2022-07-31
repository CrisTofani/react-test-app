import * as React from "react";
import styled from "styled-components";

const Message = styled.p`
  font-family: -apple-system, BlinkMacSystemFont;
  font-size: 1rem;
  font-weight: 600;
  margin: auto;
`;

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => <Message>{message}</Message>;

export default ErrorMessage;
