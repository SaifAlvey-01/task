'use client'
import React from 'react';
import { useRouter } from 'next/router';
import GoogleMapReact from 'google-map-react';

const UserProfilePage = ({ user }) => {
  const router = useRouter();

  const renderGoogleMap = () => {
    return (
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
          defaultCenter={{ lat: parseFloat(user.location.coordinates.latitude), lng: parseFloat(user.location.coordinates.longitude) }}
          defaultZoom={10}
        >
          <div
            lat={parseFloat(user.location.coordinates.latitude)}
            lng={parseFloat(user.location.coordinates.longitude)}
            style={{ color: 'red', fontSize: '30px' }}
          >
            📍
          </div>
        </GoogleMapReact>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => router.back()}>Go Back</button>
      <div>
        <h1>{`${user.name.title}. ${user.name.first} ${user.name.last}`}</h1>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Cell: {user.cell}</p>
        <p>Address: {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}</p>
        <p>Age: {user.dob.age}</p>
        <img src={user.picture.large} alt="User" />
        {/* Display Nationality Flag */}
        <img src={`https://www.countryflags.io/${user.nat}/shiny/64.png`} alt="Nationality Flag" />
        {/* Google Map */}
        {renderGoogleMap()}
      </div>
    </div>
  );
};

export default UserProfilePage;