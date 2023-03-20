import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState,useEffect } from "react";
import logo from "./logo.svg";
import { useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";

const Login = () => {

  const nav = useNavigate();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  function handleLogin() {
    if (!username || !password) return toast.error("All credentials required");
    axios.post(`/auth/login`, { username,password })
      .then((res) => {
        toast.success("login successfull");
          
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success("login successfull");
        nav("/chat");
      })
      .catch((err) => toast.error(err.response.data.message));
    }
    return(
        <>
        <Toaster />
        <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="box_auth"
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10vh",
          }}
        >
          <img src={logo} height="100" width="100" >
            
          </img>
          <h1 style={{ color: "black", marginBottom: "18px" }}>Welcome back</h1>
          <input
            
           value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              marginTop: "15px",
              width: "270px",
              height: "41px",
              paddingLeft: "8px",
              background: "white",
              fontSize: "16px",
              outline: "none",
              color: "black",
              border: "1px solid gray",
              marginBottom: "18px",
              borderRadius: "4px",
            }}
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginTop: "15px",
              width: "270px",
              height: "41px",
              paddingLeft: "8px",
              background: "white",
              fontSize: "16px",
              color: "black",
              outline: "none",
              border: "1px solid gray",
              borderRadius: "4px",
              marginBottom: "18px",
            }}
            type="password"
            placeholder="Password"
          />
          <button
           onClick={e=>handleLogin(e)}
            style={{
              marginTop: "15px",
              width: "285px",
              height: "41px",
              fontSize: "16px",
              outline: "none",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#10a37f",
              color: "white",
              marginBottom: "12px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <p style={{ marginTop: "14px", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link
              style={{ color: "#10a37f", textDecoration: "none" }}
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
    )
}

export default Login;