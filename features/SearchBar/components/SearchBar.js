import React from "react";
import styled from "styled-components";

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

  return <div>SearchBar</div>;
}

export default SearchBar;
