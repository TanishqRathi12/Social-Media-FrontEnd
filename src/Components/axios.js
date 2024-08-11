import instanceAxios from 'axios';

const axios = instanceAxios.create({
    baseURL: 'https://social-media-backend-dusky.vercel.app/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axios;
