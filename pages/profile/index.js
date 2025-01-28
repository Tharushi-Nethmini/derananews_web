'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../../utils/auth";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile");

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white shadow-md rounded-lg">
      {user ? (
        <>
          <h2 className="text-xl font-semibold text-center mb-4">Profile</h2>
          <div className="mb-4">
            <strong>Name:</strong> {user.name}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {user.email}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
