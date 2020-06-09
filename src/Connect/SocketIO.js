import io from 'socket.io-client';
const URL = 'https://ssrestaurant.herokuapp.com';
// const URL = 'http://192.168.1.112:8000';
const socket = io(URL);
export default socket;
