import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ArticleCard from "@/features/ArticleCard/ArticleCard";
import SearchBar from "@/features/SearchBar/SearchBar";

const PageContainer = styled.div`
  margin-top: 3vh;
  padding: 0 20px; /* Adjust padding as needed */
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 2rem;
`;

const PaginationButton = styled.button`
  background: none;
  border: none;
  margin: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default function SearchPage({ favoriteState, setFavoriteState }) {
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
      `https://newsapi.org/v2/everything?q=${keyWord}&from=${dateRangeFrom}&to=${dateRangeTo}&language=${languageValue}&pageSize=20&page=${page}&apiKey=21247b89f2cf48c48d0df5ed148af376`
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

  return (
    <PageContainer>
      <SearchBar
        dateRangeFrom={dateRangeFrom}
        setDateRangeFrom={setDateRangeFrom}
        dateRangeTo={dateRangeTo}
        setDateRangeTo={setDateRangeTo}
        languageValue={languageValue}
        setLanguageValue={setLanguageValue}
        keyWord={keyWord}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to load data</p>}
      {data && data.articles && (
        <div>
          {data.articles.map((article, index) => (
            <ArticleCard
              key={index}
              article={article}
              favoriteState={favoriteState}
              setFavoriteState={setFavoriteState}
            />
          ))}
          <PaginationContainer>
            <PaginationButton
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft color="#001233" size={25} strokeWidth={1} />
            </PaginationButton>
            <PaginationButton
              onClick={() => handlePageChange(page + 1)}
              disabled={!data || !data.articles || data.articles.length < 20}
            >
              <ChevronRight color="#001233" size={25} strokeWidth={1} />
            </PaginationButton>
          </PaginationContainer>
        </div>
      )}
    </PageContainer>
  );
}
