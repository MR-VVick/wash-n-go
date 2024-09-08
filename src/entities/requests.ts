export interface ISignin {
    phone: string;
    password: string;
}
export interface ISignup {
    phone: string;
    name: string;
    password: string;
}

export interface TokenResponse {
    name: string;
    phone?: string;
    profilePicture?: string | null;
    isActive: boolean;
    password?: string;
    fcmToken?: string | null;
}