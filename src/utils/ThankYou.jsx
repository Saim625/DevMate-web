import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your purchase. Your payment has been received.</p>
        <Link
          to="/"
          className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
