import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const axiosCLient = axios.create({
  baseURL: 'http://localhost:8000',
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
    if (error.response.status === 401) {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      axiosCLient.post('/auth/token', {refreshToken}).then(async (res) => {
        await AsyncStorage.setItem('accessToken', res.accessToken);
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + res.accessToken;
        return axios(originalRequest);
      });
    }
  },
);

export default axiosCLient;
