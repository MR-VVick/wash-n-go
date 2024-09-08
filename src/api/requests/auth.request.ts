
import { ApiResponse } from '../../entities/common';
import { ISignin, ISignup, TokenResponse } from '../../entities/requests';
import http from '../http';

export const signup = (data: ISignup) => http.post<ApiResponse<TokenResponse>>('/register', data);

export const signin = (data: ISignin) => http.post<ApiResponse<TokenResponse>>('/login', data);
