'use client'
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import UserProfilePage from '../../components/UserProfilePage';
import Header from "../../components/Header"

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data based on userId
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?uuid=${userId}`);
        const data = await response.json();
        setUser(data.results[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>; // or display a loading indicator
  }

  return (
    <div>
      <UserProfilePage user={user} />
    </div>
  );
};

export default Profile;