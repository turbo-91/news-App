import React from "react";
import styled from "styled-components";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import SubmitButton from "@/components/ui/SubmitButton";
import useSWR from "swr";
import DateRangeCompFrom from "./components/DataRangeCompFrom";
import DateRangeCompTo from "./components/DateRangeCompTo";
import LanguageDropdown from "./components/LanguageDropdown";
import { useState } from "react";

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 1rem;
  border: 1px solid #001233;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const InlineContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

function SearchBar({
  dateRangeFrom,
  setDateRangeFrom,
  dateRangeTo,
  setDateRangeTo,
  languageValue,
  setLanguageValue,
  keyWord,
  setKeyword,
  onSearch,
}) {
  // Disable space key in input
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InlineContainer>
        <FormGroup>
          <Label htmlFor="date-from">From:</Label>
          <DateRangeCompFrom
            dateRange={dateRangeFrom}
            setDateRange={setDateRangeFrom}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date-to">To:</Label>
          <DateRangeCompTo
            dateRange={dateRangeTo}
            setDateRange={setDateRangeTo}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="select-language">Select a language:</Label>
          <LanguageDropdown
            languageValue={languageValue}
            setLanguageValue={setLanguageValue}
          />
        </FormGroup>
      </InlineContainer>
      <FormGroup>
        <Label htmlFor="keywords">Type one keyword:</Label>
        <Input
          id="keywords"
          value={keyWord}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </FormGroup>
      <InlineContainer>
        <SubmitButton type="submit"></SubmitButton>
      </InlineContainer>
    </Form>
  );
}

export default SearchBar;
