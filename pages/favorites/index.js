import FavoritesList from "@/features/FavoritesList/FavoritesList";
import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const BackButton = styled.button`
  padding: 10px 15px;
  background-color: transparent;
  color: #001233;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #001233;
  text-decoration: none;
  margin-left: 0; /* Reset margin-left */
  margin-bottom: 10px; /* Optional: Add some bottom margin for spacing */

  &:hover {
    opacity: 80%;
  }
`;

function Favorites({ favoriteState, setFavoriteState }) {
  return (
    <Container>
      <FavoritesList
        favoriteState={favoriteState}
        setFavoriteState={setFavoriteState}
      />
      <Link href={`/user`}>
        <BackButton>Back</BackButton>
      </Link>
    </Container>
  );
}

export default Favorites;
