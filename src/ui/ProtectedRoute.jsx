// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useAuth } from "../features/authentication/useAuth";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // load user
  const { isLoading, isAuthunticated, user } = useAuth();

  // redirect not authunticated user to log in
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthunticated && !user) navigate("/login");
  }, [isAuthunticated, isLoading, navigate, user]);

  // loading spinner
  if (isLoading) return <Spinner />;

  // return app
  return children;
}
