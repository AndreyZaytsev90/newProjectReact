import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
        'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
    }
})