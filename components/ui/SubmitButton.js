import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px 15px;
  background-color: transparent;
  color: #001233;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;
  border: 1px solid #001233;

  &:hover {
    opacity: 80%;
  }
`;

function Button() {
  return <Button />;
}

export default Button;
