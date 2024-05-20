// eslint-disable-next-line no-unused-vars
import React from "react";
import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyleHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Header() {
  return (
    <StyleHeader>
      <div>
        <UserAvatar />
      </div>
      <HeaderMenu />
    </StyleHeader>
  );
}
