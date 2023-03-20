import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import logo from "./logo.svg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
const nav = useNavigate();
const [username,setUsername] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
function handleLogin() {
  if (!username || !password) return toast.error("All credentials required");
  axios.post(`/auth/signup`, { username, email,password })
    .then((res) => {
      localStorage.setItem("auth", JSON.stringify(res.data));
      toast.success("Signup successfull");
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
          <img src={logo} height="100" width="100"  alt="logo">
            
          </img>
          <h1 style={{ color: "black", marginBottom: "18px" }}>Explore Us </h1>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="email"
            placeholder="email"
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
            onClick={e=>handleLogin()}
          >
            Signup
          </button>
          <p style={{ marginTop: "14px", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link
              style={{ color: "#10a37f", textDecoration: "none" }}
              to="/login"
            >
              login
            </Link>
          </p>
        </div>
      </div>

    </>
)
}


export default Signup;