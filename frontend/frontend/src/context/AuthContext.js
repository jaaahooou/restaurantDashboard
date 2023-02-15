import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let loginUser = async (e) => {
    e.preventDefault();

    let response = await fetch("http://127.0.0.1:8000/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.name.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      console.log(authTokens);
      navigate("/");
    } else {
      alert("something went wrong");
      navigate("/login");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  // let updateToken = async () => {
  //   let response = await fetch("http://127.0.0.1:8000/user/refresh/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: e.target.name.value,
  //       password: e.target.password.value,
  //     }),
  //   });
  // };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    authTokens: authTokens,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
