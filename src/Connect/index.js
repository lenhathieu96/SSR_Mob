import io from 'socket.io-client';
export const URL = 'https://ssrestaurant.herokuapp.com';
// export const URL = 'http://localhost:8000'

export const socket = io(URL);
