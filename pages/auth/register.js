import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://derananews-api.vercel.app/api/auth/register", {
        name,
        email,
        password,
      });

      router.push("/auth/login");  
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
  <div  className=" flex items-center justify-center min-h-screen">
    <div className="max-w-md mx-auto my-12 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Register</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
