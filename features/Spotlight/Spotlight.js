import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ArticleCard from "../ArticleCard/ArticleCard";
import useSWR from "swr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CountryDropdown from "./components/CountryDropdown";
import { CircleArrowRight, CircleArrowLeft } from "lucide-react";
import newsAppThumbnail from "/assets/news-app-thumbnail.png";
import newsAppThumbNoText from "/assets/newsapp-notext.png";
import Image from "next/legacy/image";

const Title = styled.h2`
  font-family: Bookman, Garamond, Georgia;
  font-size: 2em;
  margin-top: 4vh;
  margin-bottom: 2vh;
  color: #001233;
  text-align: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-style: italic;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;

const SliderContainer = styled.div`
  margin-top: 5px;
`;

const CountryDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin-bottom: 10px;
    color: #001233;
  }
`;

const StyledLabel = styled.label`
  margin-bottom: 10px;
  color: #001233;
  font-size: 1.1em; /* Adjust font size as needed */
  font-weight: bold;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;

  button {
    margin: 0;
    padding: 0px;
    background-color: white;
    border: none;
    cursor: pointer;

    &:hover {
      opacity: 80%;
    }
  }
`;

export default function Spotlight({ favoriteState, setFavoriteState }) {
  // bypass next/Image components domain restriction! Caution! Security concern.
  const customLoader = ({ src }) => {
    return src;
  };

  // Data fetching
  const [url, setUrl] = useState(null);
  const [countryValue, setCountryValue] = useState("");
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher, { shouldRetryOnError: false });
  const isLoading = !error && !data && !!url;

  const handleCountryChange = (value) => {
    setCountryValue(value);
    setUrl(
      `https://newsapi.org/v2/top-headlines?country=${value}&apiKey=21247b89f2cf48c48d0df5ed148af376`
    );
  };

  // Slider functionality
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <Container>
      <CountryDropdownContainer>
        <StyledLabel htmlFor="country-select">Top Headlines from:</StyledLabel>
        <CountryDropdown
          countryValue={countryValue}
          setCountryValue={handleCountryChange}
        />
      </CountryDropdownContainer>
      {countryValue && (
        <NavigationButtons>
          <button onClick={previous}>
            <CircleArrowLeft color="#001233" strokeWidth={1} />
          </button>
          <button onClick={next}>
            <CircleArrowRight color="#001233" strokeWidth={1} />
          </button>
        </NavigationButtons>
      )}

      {!countryValue && (
        <Image
          unoptimized={customLoader}
          src={newsAppThumbNoText}
          alt="Default Image"
          layout="responsive"
          width={700}
          height={400}
        />
      )}
      {isLoading && <LoadingMessage>Loading...</LoadingMessage>}
      {error && <ErrorMessage>Failed to load data</ErrorMessage>}
      {data && data.articles && (
        <SliderContainer>
          <Slider ref={sliderRef} {...settings}>
            {data.articles.map((article, index) => (
              <div key={index}>
                <ArticleCard
                  article={article}
                  favoriteState={favoriteState}
                  setFavoriteState={setFavoriteState}
                />
              </div>
            ))}
          </Slider>
        </SliderContainer>
      )}
    </Container>
  );
}
