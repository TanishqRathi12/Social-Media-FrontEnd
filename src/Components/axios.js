import instanceAxios from 'axios';


export const axios = instanceAxios.create({
    baseURL: 'https://social-media-backend-dusky.vercel.app/',
    headers: {
        'Content-Type': 'application/json',
    },
})
export default axios;
