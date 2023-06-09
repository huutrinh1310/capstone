export interface AccountLoginResponse {
    status: number;
    token: string;
    refreshToken?: string;
}
