// eslint-disable-next-line no-unused-vars
import React from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "./ButtonIcon";
import { useLogout } from "../features/authentication/useAuth";
import SpinnerMini from "../ui/SpinnerMini";

export default function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
