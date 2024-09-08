import Toast from 'react-native-toast-message';
import { API_URL } from 'react-native-dotenv';
import { ApiResponseError } from '../api/http';


export const onAPIError = (err: ApiResponseError) => {
  Toast.show({
    type: 'error',
    text1: err.message,
  });
};

export const onAPISuccess = (res: string) => {
  Toast.show({
    type: 'success',
    text1: res,
  }); 
};
