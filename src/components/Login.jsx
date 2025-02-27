import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

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
      dispatch(addUser(res.data))
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="relative flex flex-col justify-center h-screen overflow-hidden">
      <div class="w-full p-6 m-auto bg-base-300 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 class="text-3xl font-semibold text-center">Login</h1>
        <form class="space-y-4">
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
          <a href="#" class="text-xs hover:underline hover:text-blue-600">
            Forget Password?
          </a>
          <div>
            <button
              type="button"
              class="btn-neutral btn btn-block"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
