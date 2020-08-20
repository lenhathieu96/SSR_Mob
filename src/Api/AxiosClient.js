import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const axiosCLient = axios.create({
  baseURL: 'https://ssrestaurant.herokuapp.com',
  headers: {
    'content-type': 'application/json',
  },
});

axiosCLient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

axiosCLient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    if (error.response.status === 401) {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      return axiosCLient
        .post('/auth/token', {refreshToken})
        .then(async (res) => {
          try {
            await AsyncStorage.setItem('accessToken', res.accessToken);
            // console.log(res.accessToken, 'accesToken');
            //send new token to request
            originalRequest.headers.Authorization = 'Bearer ' + res.accessToken;
          } catch (err) {
            console.log('Error Get New AccessToken: ', err);
          }
          return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  },
);

export default axiosCLient;
