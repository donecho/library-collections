import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Login Successful!");

      // ROLE SPLIT NAVIGATION
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/books");
      }
    } catch (err) {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Welcome Back 👋
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-medium transition duration-200"
        >
          Login
        </button>
        <p className="text-sm text-center mt-3">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-500 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
