import React from "react";
import styled from "styled-components";

const PaginationButton = styled.button`
  background: none;
  border: none;
  margin: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function PaginationButton() {
  return <PaginationButton />;
}

export default PaginationButton;
