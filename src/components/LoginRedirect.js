import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const LoginRedirect = () => {
  let navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return <Layout />;
};

export default LoginRedirect;
