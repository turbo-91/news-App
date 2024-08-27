import React from "react";
import styled from "styled-components";
import Dropdown from "@/components/form/Dropdown";

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const DropdownWrapper = styled.div`
  width: 50%;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
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
      <DropdownWrapper>
        <Dropdown
          id="select-language"
          onChange={handleSelect}
          value={languageValue}
        >
          <option value="">All</option>
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
