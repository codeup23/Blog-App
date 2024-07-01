import React from 'react';
import { useState } from 'react';

const Register = () => {

const [name, setName] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

async function register(event) {
    event.preventDefault();
    
    const response = await fetch('https://blog-app-2-qyll.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            username: username,
            password: password,
        }),
    });

    if(response.status === 200){
        alert('User created successfully');
    }
    else{
        alert('User already exists, or maybe bad request');
    }
}

  return (
    <div>
        <form action="" onSubmit={register}
        className='flex flex-col w-2/3 mx-auto mt-20 border border-gray-300 p-5 rounded-lg bg-gray-300'
        >
            <h1 className='text-center mx-auto w-full text-blue-950 mb-5 font-bold text-3xl'>Sign Up</h1>

            <input type="text" 
            placeholder='Name' 
            className='block w-full p-2 border border-gray-300 rounded-lg mb-3 hover:border-blue-400'
            value={name}
            onChange={event => {
                setName(event.target.value);
            }}
            />

            <input type="text" 
            placeholder="Username" 
            className="block w-full p-2 border border-gray-300 rounded-lg mb-3 hover:border-blue-400" 
            value={username}
            onChange={event => {
                setUsername(event.target.value);
            }}
            />

            <input type="password" 
            placeholder="Password" 
            className="block w-full p-2 border border-gray-300 rounded-lg mb-3 hover:border-blue-400" 
            value={password}
            onChange={event => {
                setPassword(event.target.value);
            }}
            />

            <button className='block w-full p-2 border-gray-800 rounded-lg mb-3 bg-gray-800 text-white 
            hover:bg-gray-700 mx-auto'>Sign Up</button>
        </form>
    </div>
  )
}

export default Register;