// eslint-disable-next-line no-unused-vars
import React from "react";
import Logout from "./Logout";
import ButtonIcon from "./ButtonIcon";
import { HiArrowLeftOnRectangle, HiOutlineUser } from "react-icons/hi2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledList>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/login")}>
          <HiArrowLeftOnRectangle />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledList>
  );
}
