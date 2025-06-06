import axios from 'axios';

export const api = axios.create({
	baseURL: process.env.NEXT_API_BASE_URL
});
