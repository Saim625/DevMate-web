import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="text-gray-700 mb-6">It looks like your payment was cancelled. You can try again.</p>
        <Link
          to="/"
          className="inline-block bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
