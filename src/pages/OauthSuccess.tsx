
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeLogin = async () => {
      try {
        // refresh token auto sent
        const res = await api.get("/auth/refresh");

        // store access token
        localStorage.setItem("accessToken", res.data.accessToken);

        navigate("/products");
      } catch {
        navigate("/");
      }
    };

    completeLogin();
  }, []);

  return <h1>Logging you in...</h1>;
};

export default OAuthSuccess;
