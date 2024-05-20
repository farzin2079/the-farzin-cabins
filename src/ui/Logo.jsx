// eslint-disable-next-line no-unused-vars
import React from "react";
import styled, { css } from "styled-components";

import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const LogoText = styled.div`
  font-size: 2.3rem;
  color: #204b07;
  ${(props) =>
    props.isdarkmode &&
    css`
      color: var(--color-brand-200);
    `}
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <StyledLogo>
      <Img src="favicon.png" alt="Logo" />
      <LogoText isdarkmode={isDarkMode}> THE FARZIN CABINS </LogoText>
    </StyledLogo>
  );
}

export default Logo;
