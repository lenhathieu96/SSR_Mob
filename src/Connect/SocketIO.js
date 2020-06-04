import io from 'socket.io-client';
const URL = 'https://ssrestaurant.herokuapp.com';

const socket = io(URL);

export default socket;
