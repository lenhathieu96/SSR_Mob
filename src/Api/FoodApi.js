import axiosCLient from './AxiosClient';

const FoodApi = {
  getAllFood: () => {
    const url = '/food';
    return axiosCLient.get(url);
  },
};

export default FoodApi;
