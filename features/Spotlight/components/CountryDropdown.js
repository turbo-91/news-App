import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DropdownWrapper = styled.div`
  border: 0.8px solid #001233;
  border-radius: 3px;
  background-color: #white;
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 4px;
  border: none;
  border-radius: 3px;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

export default function CountryDropdown({ countryValue, setCountryValue }) {
  const options = [
    { label: "", value: "" },
    { label: "Argentina", value: "ar" },
    { label: "Australia", value: "au" },
    { label: "Austria", value: "at" },
    { label: "Belgium", value: "be" },
    { label: "Brazil", value: "br" },
    { label: "Bulgaria", value: "bg" },
    { label: "Canada", value: "ca" },
    { label: "China", value: "cn" },
    { label: "Colombia", value: "co" },
    { label: "Cuba", value: "cu" },
    { label: "Czech Republic", value: "cz" },
    { label: "Egypt", value: "eg" },
    { label: "France", value: "fr" },
    { label: "Germany", value: "de" },
    { label: "Greece", value: "gr" },
    { label: "Hong Kong", value: "hk" },
    { label: "Hungary", value: "hu" },
    { label: "India", value: "in" },
    { label: "Indonesia", value: "id" },
    { label: "Ireland", value: "ie" },
    { label: "Israel", value: "il" },
    { label: "Italy", value: "it" },
    { label: "Japan", value: "jp" },
    { label: "Latvia", value: "lv" },
    { label: "Lithuania", value: "lt" },
    { label: "Malaysia", value: "my" },
    { label: "Mexico", value: "mx" },
    { label: "Morocco", value: "ma" },
    { label: "Netherlands", value: "nl" },
    { label: "New Zealand", value: "nz" },
    { label: "Nigeria", value: "ng" },
    { label: "Norway", value: "no" },
    { label: "Philippines", value: "ph" },
    { label: "Poland", value: "pl" },
    { label: "Portugal", value: "pt" },
    { label: "Romania", value: "ro" },
    { label: "Russia", value: "ru" },
    { label: "Saudi Arabia", value: "sa" },
    { label: "Serbia", value: "rs" },
    { label: "Singapore", value: "sg" },
    { label: "Slovakia", value: "sk" },
    { label: "Slovenia", value: "si" },
    { label: "South Africa", value: "za" },
    { label: "South Korea", value: "kr" },
    { label: "Sweden", value: "se" },
    { label: "Switzerland", value: "ch" },
    { label: "Taiwan", value: "tw" },
    { label: "Thailand", value: "th" },
    { label: "Turkey", value: "tr" },
    { label: "Ukraine", value: "ua" },
    { label: "United Arab Emirates", value: "ae" },
    { label: "United Kingdom", value: "gb" },
    { label: "United States", value: "us" },
    { label: "Venezuela", value: "ve" },
  ];

  function handleSelect(event) {
    setCountryValue(event.target.value);
  }

  return (
    <DropdownContainer>
      <DropdownWrapper>
        <Dropdown
          id="country-select"
          value={countryValue}
          onChange={handleSelect}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Dropdown>
      </DropdownWrapper>
    </DropdownContainer>
  );
}
