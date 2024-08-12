import instanceAxios from 'axios';


export const axios = instanceAxios.create({
    baseURL: 'https://social-media-backend-h61d.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
})
export default axios;
