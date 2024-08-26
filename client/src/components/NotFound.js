import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpotify } from 'react-icons/fa'; // Import Spotify icon from react-icons

function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="text-center">
        {/* Spotify Icon */}
        <div className="mb-6">
          <FaSpotify className="mx-auto h-16 w-16 text-green-500" />
        </div>

        {/* 404 Message */}
        <h1 className="text-4xl font-bold mb-4">404 | Not Found</h1>
        <p className="text-lg">
          <Link
            to="/register"
            className="text-green-500 hover:text-green-400 underline transition-colors duration-200"
          >
            Register
          </Link>{' '}
          now to use Spotify Music
        </p>

        {/* Optional: Add a Home Button */}
        <div className="mt-6">
          <Link
            to="/login"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
