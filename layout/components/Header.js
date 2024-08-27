import React from "react";
import styled from "styled-components";
import Image from "next/legacy/image";
import newsAppLogo from "/assets/news-app-logo.png";

const StyledHeader = styled.header`
  margin-top: 20px;
  width: 100%;
  height: 10vh;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  //   overflow: hidden;
`;

export default function Header() {
  return (
    <StyledHeader>
      <LogoContainer>
        <Image
          src={newsAppLogo}
          alt="News App Logo"
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      </LogoContainer>
    </StyledHeader>
  );
}
