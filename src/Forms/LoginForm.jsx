import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import axios from "../Components/axios"

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("/login",{
                email,
                password
            });
            console.log('Login form submitted');
            console.log(response);
            login(); 
            setEmail('');
            setPassword('');
            navigate('/'); 
        }catch(err){
            console.log(err.message);
            setEmail('');
            setPassword('');
            alert('Invalid email or password');
        }
        
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-600">Don't have an account? 
                        <Link to="/signup" className="text-blue-500 hover:text-blue-800 ml-1">Sign Up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;


