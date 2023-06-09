import { AccountLoginResponse } from '@/models/response/AccountLoginResponse';

export const get = () => {
    const token: any = window.localStorage.getItem('token');
    return token;
};

export const set = (res: AccountLoginResponse) => {
    const token = localStorage.setItem('token', JSON.stringify(res));
    return token;
};

export const remove = () => {
    const token = localStorage.removeItem('token');
    return token;
};

export const storageToken = {
    get,
    set,
    remove,
};
