import React from "react";
import styled from "styled-components";

import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StyleSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1ox solide var(--color-grey-1000);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function Sidebar() {
  return (
    <StyleSidebar>
      <Logo />
      <MainNav />
    </StyleSidebar>
  );
}
