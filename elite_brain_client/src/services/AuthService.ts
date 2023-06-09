import { AccountLoginRequest } from '@/models/request/AccountLoginRequest';
import { RegisterWithoutVerifyRequest } from '@/models/request/RegisterWithoutVerifyRequest';
import { AccountLoginResponse } from '@/models/response/AccountLoginResponse';
import { storageToken } from '@/utils/TokenStorage';
import * as httpRequest from '@/utils/httpRequest';
import { EmailVerifyRequest } from '@/models/request/EmailVerifyRequest';

export const signIn = async (account: AccountLoginRequest) => {
    const response = await httpRequest.post(`/auth/login`, account);
    const result: AccountLoginResponse = {
        token: response.data.access_token,
        refreshToken: response.data.refresh_token,
        status: response.status,
    };
    if (result.status === 200) {
        storageToken.set(result);
    }
    return result;
};

export const signOut = async () => {
    storageToken.remove();
    const response = await httpRequest.post(`/auth/logout`);
    return response;
};

export const signUp = async (account: AccountLoginRequest) => {
    const response = await httpRequest.post(`/auth/register`, account);
    return response;
};

export const refreshTokenAuth = async (refreshToken: string) => {
    const response = await httpRequest.post(`/auth/refresh-token`, refreshToken);
    return response;
};
export const getProfile = async () => {
    const response = await httpRequest.get('/auth/profile');
    return response;
};

export const signUpWithoutVerify = async (account: RegisterWithoutVerifyRequest) => {
    const response = await httpRequest.post(`/auth/register-without-verify`, account);
    return response;
};

export const emailVerify  = async (OTPValue: EmailVerifyRequest) => {
    const response = await httpRequest.post(`/auth/verify-otp`, OTPValue);
    return response;
}

export const resendOTP  = async (email: string) => {
    const response = await httpRequest.post(`/auth/resend-otp?email=` + email);
    return response;
}
