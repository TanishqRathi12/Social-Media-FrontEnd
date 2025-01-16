import instanceAxios from 'axios';


export const axios = instanceAxios.create({
    baseURL: 'https://social-media-backend-production-60e2.up.railway.app/',
    //baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
})
export default axios;
