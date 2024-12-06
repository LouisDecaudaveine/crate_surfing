export interface Token {
    access_token: string;
    expires_in?: number;
    token_type?: string;
    refresh_token?: string;
}

export interface UserInfoGoogle{
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
}