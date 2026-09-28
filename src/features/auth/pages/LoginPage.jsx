import React from "react";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = ({ onLoginSuccess }) => {
  return <LoginForm onLoginSuccess={onLoginSuccess} />;
};