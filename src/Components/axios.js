import instanceAxios from 'axios';


export const axios = instanceAxios.create({
    baseURL: 'https://your-backend-domain.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    },
})
export default axios;
