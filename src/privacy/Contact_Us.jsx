import React from 'react';
import { FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact_Us = () => {
  return (
    <div className='flex flex-col items-center'>
        <h1 className="font-bold text-4xl text-white my-12">Contact Us</h1>
        <p className="px-16 flex items-center">
          <FaHome className="mr-2" />
          <strong>Address: </strong> House #123, Tech Street, Islamabad, Pakistan
        </p>
        <p className="px-16 flex items-center">
          <FaPhone className="mr-2" /> 
          <strong>Phone: </strong> 0300-1234567
        </p>
        <p className="px-16 flex items-center">
          <FaEnvelope className="mr-2" /> 
          <strong>Email: </strong> support@devmate.click
        </p>
    </div>
  );
}

export default Contact_Us;
