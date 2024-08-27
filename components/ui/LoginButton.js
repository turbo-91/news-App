import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/legacy/image";
import styled from "styled-components";
import githubLogo from "/assets/GitHub_Logo.png";
import githubMark from "/assets/github-mark.png";

const StyledButton = styled.button`
  background-color: transparent;
  border: 2px solid #11009e;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: black;
  font-size: 1em;
  font-family: Helvetica, Arial, sans-serif;
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
        Sign in with GitHub
        <Image src={githubMark} alt="GitHub Logo" width={20} height={20} />
        <Image src={githubLogo} alt="GitHub Logo" width={60} height={20} />
      </StyledButton>
    </Container>
  );
}
