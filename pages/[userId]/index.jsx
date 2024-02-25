"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserProfilePage from "../../components/UserProfilePage";
import Lottie from "lottie-react";
import pageload from "/public/Loader.json";

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data based on userId
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://randomuser.me/api/?uuid=${userId}`
        );
        const data = await response.json();
        setUser(data.results[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (!user) {
    return(
    <div
      style={{ backgroundColor: "#F7F9FB" }}
      className="bg-[url('/partner_assets/bg-gradient.svg')] flex h-screen overflow-hidden"
    >
      <div className=" overflow-y-auto flex flex-col items-center justify-center w-full">
        <div className="h-1/2 w-96 mx-auto my-auto">
          <Lottie animationData={pageload} loop={true} autoplay={true} />;
        </div>
      </div>
    </div>);
  }

  return (
    <div>
      <UserProfilePage user={user} />
    </div>
  );
};

export default Profile;
