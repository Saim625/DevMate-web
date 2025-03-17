import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data || "Login error");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data))
      navigate("/profile")
    } catch (err) {
      setError(err.response.data || "Sign up error");
    }
  };

  return (
    <div
      className={`relative flex flex-col ${
        isLogin ? "" : "my-5"
      } justify-center h-screen overflow-hidden`}
    >
      <div class="w-full max-w-sm p-6 m-auto bg-base-300 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 class="text-3xl font-semibold text-center">
          {isLogin ? "Login" : "Sign up"}
        </h1>
        <form class="space-y-4">
          {!isLogin && (
            <>
              {" "}
              <div>
                <label class="label">
                  <span class="text-base label-text">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  class="w-full input input-bordered"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label class="label">
                  <span class="text-base label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  class="w-full input input-bordered"
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            <label class="label">
              <span class="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              value={emailId}
              placeholder="Email Address"
              class="w-full input input-bordered"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div>
            <label class="label">
              <span class="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              class="w-full input input-bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isLogin && (
            <a href="#" class="text-xs hover:underline hover:text-blue-600">
              Forget Password?
            </a>
          )}
          <p className="text-red-600">{error}</p>
          <div>
            <button
              type="button"
              class="btn-neutral btn btn-block"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Sign up"}
            </button>
          </div>
          <p
            className="cursor-pointer"
            onClick={() => setIsLogin((prevValue) => !prevValue)}
          >
            {isLogin
              ? "Don't have an account? Create one here."
              : "Already have an account? Log in."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
