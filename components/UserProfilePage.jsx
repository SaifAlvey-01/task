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
<div className="bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={user.picture.large} alt="Profile" className="h-12 w-12 rounded-full mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{`${user.name.title}. ${user.name.first} ${user.name.last}`}</h2>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
              </div>
            </div>
            <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Phone: {user.phone}</p>
            <p className="text-sm text-gray-600 mt-1">Cell: {user.cell}</p>
            <p className="text-sm text-gray-600 mt-1">Address: {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}</p>
            <p className="text-sm text-gray-600 mt-1">Age: {user.dob.age}</p>
            {/* Display Nationality Flag */}
            <img src={`https://www.countryflags.io/${user.nat}/shiny/64.png`} alt="Nationality Flag" className="mt-4" />
            {/* Google Map */}
            <div className="mt-6">{renderGoogleMap()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;