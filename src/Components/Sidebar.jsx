import React from 'react'
import {Link} from 'react-router-dom';

export const Sidebar=()=> {
  return (
         <div className="flex flex-col w-24 sm:w-64 min-h-screen fixed bg-gray-600">
            <nav className="flex-grow">
                <ul className="space-y-2">
                <Link to="/"><li className="text-white p-4 hover:bg-gray-300 hover:text-black">
                        Home
                    </li></Link>
                    <Link to="/Profile"><li className="text-white p-4 hover:bg-gray-300 hover:text-black">
                        Profile
                    </li></Link>
                    <Link to="/Explore"><li className="text-white p-4 hover:bg-gray-300 hover:text-black">
                        Explore
                    </li></Link>
                    {/* <li className="p-4 hover:bg-gray-300">
                        <a href="#">Settings</a>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
}
