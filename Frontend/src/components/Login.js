import React from 'react';
import {useState, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {userInfo, setUserInfo} = useContext(UserContext);

    async function login(event){
        event.preventDefault();

        const response = await fetch('https://blog-app-2-qyll.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            credentials: 'include',
        });

        if(response.status !== 200){
            alert('Invalid username or password');
        }
        else{
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                alert('Logged in successfully');
                setRedirect(true);
            });
        }
    }

    if(redirect){
        return <Navigate to='/' />
    }

  return (
    <div>
        <form action="" onSubmit={login}
        className='flex flex-col w-2/5 mx-auto mt-20 border border-gray-300 p-5 rounded-lg bg-gray-300'
        >
            <h1 className='text-center mx-auto w-full text-blue-950 mb-5 font-bold text-3xl'>Login</h1>
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
            <button className='block w-full p-2 rounded-lg mb-3 bg-gray-800 text-white 
            hover:bg-gray-700 mx-auto'>Login</button>
        </form>
    </div>
  )
}

export default Login;