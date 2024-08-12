import instanceAxios from 'axios';


export const axios = instanceAxios.create({
    baseURL: 'https://social-media-backend-ten-sigma.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    },
})
export default axios;
