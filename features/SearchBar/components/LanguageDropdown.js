import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  display: flex;
`;

const Dropdown = styled.select`
  padding: 0.3rem;
  border: 1px solid #001233;
  border-radius: 4px;
  background-color: transparent;
  color: #001233;
`;

export default function LanguageDropdown({ languageValue, setLanguageValue }) {
  const options = [
    { label: "Arabic", value: "ar" },
    { label: "Chinese", value: "zh" },
    { label: "Dutch", value: "nl" },
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Hebrew", value: "he" },
    { label: "Italian", value: "it" },
    { label: "Norwegian", value: "no" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Spanish", value: "es" },
    { label: "Swedish", value: "sv" },
    { label: "Urdu", value: "ur" },
  ];

  function handleSelect(event) {
    setLanguageValue(event.target.value);
  }

  return (
    <DropdownContainer>
      <Dropdown
        id="select-language"
        onChange={handleSelect}
        value={languageValue}
        required
      >
        <option value=""></option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Dropdown>
    </DropdownContainer>
  );
}
