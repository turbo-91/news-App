import React from "react";
import styled from "styled-components";

const StyledSubmitButton = styled.button`
  padding: 10px 15px;
  background-color: transparent;
  color: #001233;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  border: 1px solid #001233;

  &:hover {
    opacity: 80%;
  }
`;

function SubmitButton() {
  return <StyledSubmitButton>Search</StyledSubmitButton>;
}

export default SubmitButton;
