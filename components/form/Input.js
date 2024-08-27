import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.2rem;
  border: 1px solid #001233;
  border-radius: 4px;
  width: 100%;
  line-height: 1.5;
`;

function InputComponent() {
  return <Input />;
}

export default Input;
