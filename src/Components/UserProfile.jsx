import React from 'react';

const UserProfile = () => {
    return (
        <div class="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
            <div class=" m-24  max-w-sm mx-auto bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                <div class="px-4 pb-6">
                    <div class="text-center my-4">
                        <img class="h-52 w-52 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                            src="https://randomuser.me/api/portraits/women/21.jpg" alt=""/>
                        <div class="py-2">
                            <h3 class="font-bold text-2xl text-gray-800 dark:text-white mb-1">Cait Genevieve</h3>
                        </div>
                    </div>
                    <div class="flex gap-2 px-2">
                        <button
                            class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
    </div>
    
    );
};

export default UserProfile;