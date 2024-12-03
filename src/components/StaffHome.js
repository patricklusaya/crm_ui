import { message } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer } from '../actions/AppActions';

export default function StaffHome() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
    });
  
    const handleInputChange = (key, value) => {
      setForm((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate form
      if (!form.name || !form.email || !form.phone || !form.address) {
        message.error('All fields are required');
        return;
      }
  
      if (!validateEmail(form.email)) {
        message.error("Please enter a valid email address");
        return;
      }
  
      try {
        // Dispatch create customer action
        await dispatch(createCustomer(form));
  
        // Clear the form on successful submission
        setForm({ name: '', email: '', phone: '', address: '' });
      } catch (error) {
        // Error handling is done in the action creator
        console.error('Customer creation failed', error);
      }
    };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Customer</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">
            Address
          </label>
          <textarea
            id="address"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
            value={form.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
}
