import axios, { AxiosRequestHeaders } from 'axios';
import { refreshTokenAuth } from '../services/AuthService';
import { storageToken } from '../utils/TokenStorage';
import { request } from 'http';

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async (path: string, option = {}) => {
    const response = await axiosClient.get(path, option);
    return response;
};

export const post = async (path: string, option = {}) => {
    const response = await axiosClient.post(path, option);
    return response;
};

export const put = async (path: string, option = {}) => {
    const response = await axiosClient.put(path, option);
    return response;
};

export const del = async (path: string, option = {}) => {
    const response = await axiosClient.delete(path, option);
    return response;
};

axiosClient.interceptors.request.use(
    async (config) => {
        const session = await JSON.parse(storageToken.get());
        if (session?.token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${session.token}`,
            } as AxiosRequestHeaders;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                return refreshTokenAuth(status).then((rs) => {
                    const config = error?.config;
                    if (rs.data?.success) {
                        if (rs.data.data) {
                            storageToken.set(rs.data.data);
                            config.headers = {
                                ...config.headers,
                                authorization: `Bearer ${rs?.data.data.accessToken}`,
                            };
                        }
                    } else {
                        console.log('Lỗi đăng nhập xóa token!');
                        storageToken.set({
                            status: 0,
                            token: '',
                            refreshToken: '',
                        });
                    }

                    return request(config);
                });
            }
            return Promise.reject(error);
        }
    }
);
export default axiosClient;
