import React from "react";
import styled from "styled-components";
import LoginButton from "@/components/ui/LoginButton";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import Link from "next/link";

const Title = styled.h2`
  font-family: Bookman, Garamond, Georgia;
  font-size: 1.3em;
  margin-top: 4vh;
  margin-bottom: 2vh;
  color: #001233;
  text-align: center;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  position: relative;
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -30px;
  flex-direction: column;
`;

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center horizontally */
  width: 100%;
  margin-bottom: 20px;
  position: relative; /* Ensure positioning context */
`;

const CircularImage = styled(Image)`
  border-radius: 50%;
  margin-right: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoutButton = styled.button`
  padding: 0;
  background-color: transparent;
  color: #001233;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  border: none;
  text-decoration: none;
  margin: 0;

  &:hover {
    opacity: 80%;
  }
`;

const FavoritesButton = styled.button`
  padding: 10px 10px;
  background-color: transparent;
  color: #001233;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  border: 1px solid #001233;
  text-decoration: none;
  margin: 0 1vw;

  &:hover {
    opacity: 80%;
  }
`;

const SearchesButton = styled.button`
  padding: 10px 10px;
  background-color: transparent;
  color: #001233;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  border: 1px solid #001233;
  text-decoration: none;
  margin: 0 1vw;

  &:hover {
    opacity: 80%;
  }
`;

export default function LoginPage(favorites, setFavorites) {
  const { data: session, status } = useSession();

  const handleSearchButtonClick = () => {
    alert("Stay tuned!");
  };

  return (
    <Container favorites={favorites} setFavorites={setFavorites}>
      <LoginButton />
      {session && (
        <>
          <Title>Welcome back {session.user.name}!</Title>
          <UserSection>
            <ImageSection>
              <CircularImage
                src={session.user.image}
                alt="User Avatar"
                width={200}
                height={200}
              />
            </ImageSection>
            <ButtonsContainer>
              <Link href="/favorites" passHref>
                <FavoritesButton>Favorite Articles</FavoritesButton>
              </Link>
              <SearchesButton onClick={handleSearchButtonClick}>
                Search Patterns
              </SearchesButton>

              <LogoutButton onClick={() => signOut()}>
                <LogOut color="#001233" size={40} strokeWidth={0.7} />
              </LogoutButton>
            </ButtonsContainer>
          </UserSection>
        </>
      )}
    </Container>
  );
}
