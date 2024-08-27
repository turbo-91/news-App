import React from "react";
import styled from "styled-components";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import Button from "@/components/ui/SubmitButton";
import useSWR from "swr";
import DateRangeCompFrom from "./DataRangCompFrom";

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

const BottomContainer = styled.div`
  margin-top: 15px; /* Space between the rows */
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

  const handleSearch = () => {
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
        <FormGroup>Dete To</FormGroup>
        <FormGroup>select language</FormGroup>
      </InlineContainer>
      <BottomContainer>
        <FormGroup>Keyword Input</FormGroup>
      </BottomContainer>
      <Button type="submit">Search</Button>
    </Form>
  );
}

export default SearchBar;
