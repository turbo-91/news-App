import React from "react";
import styled from "styled-components";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import SubmitButton from "@/components/ui/SubmitButton";
import useSWR from "swr";
import DateRangeCompFrom from "./DataRangeCompFrom";
import DateRangeCompTo from "./DateRangeCompTo";
import LanguageDropdown from "./LanguageDropdown";
import { useState, useRef } from "react";

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

function SearchBar() {
  // States to store date range & language dropdown value
  const [dateRangeFrom, setDateRangeFrom] = useState("");
  const [dateRangeTo, setDateRangeTo] = useState("");
  const [languageValue, setLanguageValue] = useState("");
  const [keyWord, setKeyword] = useState("");

  // Data fetching
  const [url, setUrl] = useState(null);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher, { shouldRetryOnError: false });
  const isLoading = !error && !data && !!url;

  // Handle form submission
  const handleSearch = (event) => {
    event.preventDefault();
    setUrl(
      `https://newsapi.org/v2/everything?q=${keyWord}&from=${dateRangeFrom}&to=${dateRangeTo}&language=${languageValue}&pageSize=20&page=${page}&apiKey=10181d5d9ec24883abec4df6256a487e`
    );
  };

  // Pagination
  const [page, setPage] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setUrl(
      `https://newsapi.org/v2/everything?q=${keyWord}&from=${dateRangeFrom}&to=${dateRangeTo}&language=${languageValue}&pageSize=20&page=${newPage}&apiKey=21247b89f2cf48c48d0df5ed148af376`
    );
  };

  // Disable space key in input
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <Form onSubmit={handleSearch}>
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
