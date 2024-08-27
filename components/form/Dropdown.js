import React from "react";
import styled from "styled-components";

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #001233;
  border-radius: 4px;
  background-color: transparent;
  color: #001233;
  font-size: 1rem;
`;

function Dropdown() {
  return <Select />;
}

export default Dropdown;
