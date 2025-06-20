import axios from 'axios';

import { ISession } from '@/redux/types';
import { cookies } from '@/services';

declare module 'axios' {
	export interface AxiosRequestConfig {
		skipAuth?: boolean;
	}
}

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use((config) => {
	if (config.skipAuth) return config;

	const requestConfig = { ...config };

	const session: ISession = cookies.get('sobrecho.session');
	requestConfig.headers.Authorization = `Bearer ${session.tokens.refresh}`;

	return requestConfig;
});

const refreshTokenRequest = async (refreshToken: string) => {
	const { data } = await api.post('/auth/refresh', { refresh: refreshToken });

	return data;
};

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 498 && !originalRequest._retry) {
			originalRequest._retry = true;

			const session: ISession = cookies.get('sobrecho.session');

			if (session) {
				try {
					const { data } = await refreshTokenRequest(session.tokens.refresh);

					cookies.set('sobrecho.session', JSON.stringify(data), {
						expires: data.tokens.refresh_expires_at
					});

					originalRequest.headers.Authorization = `Bearer ${data.tokens.access}`;

					return api(originalRequest);
				} catch (error) {
					cookies.remove('sobrecho.session', { path: '/' });
					window.location.replace('/sign-in');
					void error;
				}
			}
		}

		return Promise.reject(error);
	}
);
