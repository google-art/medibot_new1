// // src/pages/Login.jsx
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // later you can add auth logic here
//     navigate("/dashboard"); // ✅ go to home
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//       <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
//       <p className="text-gray-600 mb-6">Sign in to access your AI tools</p>

//       <form
//         onSubmit={handleLogin}
//         className="bg-white border-2 border-black p-8 w-[420px]"
//       >
//         <label className="block mb-2 font-semibold">Email Address</label>
//         <input
//           type="email"
//           required
//           placeholder="you@example.com"
//           className="w-full border-2 border-black px-3 py-2 mb-4"
//         />

//         <label className="block mb-2 font-semibold">Password</label>
//         <input
//           type="password"
//           required
//           placeholder="••••••••"
//           className="w-full border-2 border-black px-3 py-2 mb-4"
//         />

//         <div className="flex justify-between text-sm mb-4">
//           <label className="flex gap-2 items-center">
//             <input type="checkbox" />
//             Remember me
//           </label>
//           <span className="text-cyan-500 cursor-pointer">
//             Forgot password?
//           </span>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-cyan-400 py-3 font-semibold mb-4 hover:bg-cyan-500 transition"
//         >
//           → Sign In
//         </button>

//         <p className="text-center text-sm">
//           Don&apos;t have an account?{" "}
//           <Link to="/signup" className="text-cyan-500 font-semibold">
//             Sign up for free
//           </Link>
//         </p>
//       </form>

//       <Link to="/" className="mt-6 text-gray-600 hover:underline">
//         ← Back to Home
//       </Link>
//     </div>
//   );
// }
// src/Components/FirstPage/LoginForm.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    login();               // ✅ context login
    navigate("/dashboard"); // redirect
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-inter">
      <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
      <p className="text-gray-600 mb-6">
        Sign in to access your AI tools
      </p>

      <form
        onSubmit={handleLogin}
        className="bg-white border-2 border-black p-8 w-[420px]"
      >
        <label className="block mb-2 font-semibold">
          Email Address
        </label>
        <input
          type="email"
          required
          className="w-full border-2 border-black px-3 py-2 mb-4"
        />

        <label className="block mb-2 font-semibold">
          Password
        </label>
        <input
          type="password"
          required
          className="w-full border-2 border-black px-3 py-2 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-cyan-400 py-3 font-semibold mb-4"
        >
          → Sign In
        </button>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-cyan-500 font-semibold">
            Sign up for free
          </Link>
        </p>
      </form>

      <Link to="/" className="mt-6 text-gray-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
