import axiosCLient from './AxiosClient';

const AuthApi = {
  login: (params) => {
    const url = '/auth';
    return axiosCLient.post(url, {params});
  },
};

export default AuthApi;
