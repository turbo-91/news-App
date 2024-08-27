import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/legacy/image";
import styled from "styled-components";
import githubLogo from "/assets/GitHub_Logo.png";
import githubMark from "/assets/github-mark.png";

const StyledButton = styled.button`
  background-color: transparent;
  padding: 10px 20px;
  color: #001233;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #001233;
  text-decoration: none;
  margin: 0 1vw;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Full viewport height */
`;

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return null;
  }
  return (
    <Container>
      <StyledButton onClick={() => signIn("github")}>
        Sign in with
        <Image
          layout="responsive"
          src={githubMark}
          alt="GitHub Logo"
          width={20}
          height={20}
        />
        <Image
          layout="responsive"
          src={githubLogo}
          alt="GitHub Logo"
          width={60}
          height={20}
        />
      </StyledButton>
    </Container>
  );
}
