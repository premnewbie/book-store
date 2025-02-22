import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {  isLoading,login  } = useAuthStore();


  const handleLogin = async (e) => {
    e.preventDefault();
    login(email,password);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12">
      <h2 className="text-center font-semibold pt-8 md:text-2xl w-full max-w-xl mx-auto">
        Log in
      </h2>
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center items-center w-full max-w-xl mx-auto space-y-4 mt-10"
      >
        <div className="flex flex-col w-full">
          <label className="ms:text-lg">Email: </label>
          <input
            type="email"
            value={email}
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] 
          rounded-lg bg-white border border-gray-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="ms:text-lg">Password: </label>
          <input
            type="password"
            value={password}
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] 
          rounded-lg bg-white border border-gray-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#403D39] text-[#fffcf2] py-2 font-medium rounded-lg"
        >
          {isLoading ? "Please wait..." : "Log in"}
        </button>

        <p>
          Don&apos;t have an acoount?
          <Link to={"/sign-up"} className="text-[#944424] ">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
