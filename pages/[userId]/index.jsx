'use client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserProfilePage from '../../components/UserProfilePage';

const UserProfile = () => {
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {`${user.name.first} ${user.name.last}`}</p>
      <p>Email: {user.email}</p>
      {/* Display other user profile information */}
    </div>
  );
};

export default UserProfile;