
import { useMutation } from '@tanstack/react-query';
import { ISignin, ISignup, TokenResponse } from '../../entities/requests';
import { ApiResponseError } from '../http';
import { onAPIError, onAPISuccess } from '../../utils';
import { signin, signup } from '../requests/auth.request';

export const useSignup = () =>
  useMutation<TokenResponse, ApiResponseError, ISignup>({
    mutationFn: async (payload) => {
      const res = await signup(payload);
      if (res.errros || !res.status) {
        throw new ApiResponseError(res.message || 'Signup failed');
      }
      return res.data;
    },
    onSuccess: (res) => {
      onAPISuccess('Signed Up Successfully !!')
    },
    onError: onAPIError,
});

export const useSignin = () =>
  useMutation<TokenResponse, ApiResponseError, ISignin>({
    mutationFn: async (payload) => {
      const res = await signin(payload);
      if (res.errros || !res.status) {
        throw new ApiResponseError(res.message || 'Signin failed');
      }

      return res.data;
    },
    onSuccess: (res) => {
      onAPISuccess('Signed In Successfully !!')
    },
    onError: onAPIError,
});
