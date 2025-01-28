'use client'
import Link from "next/link";
import { logout, isAuthenticated } from "../utils/auth";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");  // Redirect to login page after logout
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex w-full items-center">
        
        <div className="flex justify-between items-center w-full">
          {isAuthenticated() ? (
            <>
            <Link href="/">
          <p className="text-white text-2xl">Dashboard</p>
        </Link>
              <button onClick={handleLogout} className="text-white px-4">Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <p className="text-white px-4">Login</p>
              </Link>
              <Link href="/auth/register">
                <p className="text-white px-4">Register</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
