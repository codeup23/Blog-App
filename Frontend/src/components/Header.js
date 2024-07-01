import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {useEffect} from 'react';
import { UserContext } from '../UserContext';

const Header = () => {

    const {userInfo, setUserInfo} = useContext(UserContext);
    const username = userInfo?.user?.username;

    useEffect(() => {
        fetch('https://blog-app-2-qyll.onrender.com/api/auth/profile', {
            method: 'GET',
            credentials: 'include',
        })
        .then(res => {
            res.json()
                    .then(userInfo => {
                    setUserInfo(userInfo);
        })
    });
    }, []);

    async function logoutHandler(){
        const response = await fetch('https://blog-app-2-qyll.onrender.com/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if(response.status === 200){
            setUserInfo(null);
        }

        alert('Logged out successfully');
        <Navigate to='/' />
    }

  return (
    <div>
        <header className = "flex flex-row flex-wrap justify-between m-0 content-between py-5 mb-20 min-h-20 items-center bg-gradient-to-tr from-slate-300 to-slate-600 shadow-md">

            <Link to="/" className="logo p-3 decoration-inherit font-bold text-3xl font-sans px-10">My Blog</Link>

            <nav className="flex flex-wrap gap-6 mx-10 content-end justify-between">
                {username && (
                    <div className='flex flex-row gap-6 mx-5'>
                        <Link to="/create"
                        className='text-center block h-12 w-[110px] overflow-hidden border-2 border-gray-900 bg-gray-900 text-gray-100 rounded-md p-2 hover:bg-gray-700  hover:border-gray-700 transition duration-300 ease-in-out shadow-md'
                        >
                            Create
                        </Link>

                        <Link to="/"
                        className='text-center block h-12 w-[110px] overflow-hidden border-2 border-gray-900 bg-gray-900 text-gray-100 rounded-md p-2 hover:bg-gray-700 hover:border-gray-700  transition duration-300 ease-in-out shadow-md'
                        >
                            <button onClick={logoutHandler}>
                                Logout
                            </button>
                        </Link>
                    </div>
                )}
                {
                    !username && (
                        <div className='flex flex-wrap flex-row gap-6 mx-5'>
                            <Link to="/login"
                            className='text-center block h-12 w-[110px] overflow-hidden border-2 border-gray-900 bg-gray-900 text-gray-100 rounded-md p-2 hover:bg-gray-700 hover:border-gray-700  transition duration-300 ease-in-out shadow-md'
                            >
                                Login
                            </Link>

                            <Link to="/register"
                            className='text-center block h-12 w-[110px] overflow-hidden border-2 border-gray-900 bg-gray-900 text-gray-100 rounded-md p-2 hover:bg-gray-700 hover:border-gray-700  transition duration-300 ease-in-out shadow-md'
                            >
                                Register
                            </Link>
                        </div>
                    )
                }
            </nav>

        </header>
  </div>
  )
}

export default Header