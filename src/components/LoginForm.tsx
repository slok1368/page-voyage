"use client"
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios'; // Make sure you have axios installed

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        console.log({
            username,
            email,
            password,
          });
      const response = await axios.post('/api/createUser', {
        username,
        email,
        password,
      });

      console.log('User created:', response.data.message);
      // You can also navigate to a new page or show a success message
    } catch (error) {
      console.error('Error creating user:', error.response.data.error);
      // Handle the error, show an error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input className="text-black" type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input className="text-black" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input className="text-black" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
};

export default LoginForm;
