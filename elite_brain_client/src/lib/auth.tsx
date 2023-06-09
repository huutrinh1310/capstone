import { checkAuth } from '@/services/AuthService';
import { storageToken } from '@/utils/TokenStorage';
import jwtDecode from 'jwt-decode';

export const getUser = () => {
    const token: any = storageToken.get();
    if (!token) return null;
    const user: any = jwtDecode(token);
    return user;
};

export const verifyToken = async () => {
    try {
        const response = await checkAuth();
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
