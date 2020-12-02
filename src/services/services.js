import axios from 'axios';

export const loginUser = async (email, password) => axios.post('https://arcane-scrubland-64110.herokuapp.com/auth/login', { email, password });

export const searchForVehicleByLicense = async searchTerm => axios.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${searchTerm}`);

export const getVehicleImage = async query => axios.get(`https://www.googleapis.com/customsearch/v1?q=${query}&cx=a16bfe8fa49f68444&key=AIzaSyBmgmGRxBi2u3HdkJC2wK2NAHACY0GcTQQ&searchType=image&num=1`);

export const checkIfVehicleAdded = async (searchTerm, token) => axios.get(`https://arcane-scrubland-64110.herokuapp.com/vehicles/search/${searchTerm}`, { headers: { Authorization: `Bearer ${token}` } });

export const saveVehicle = async (vehiclesData, token) => axios.post('https://arcane-scrubland-64110.herokuapp.com/vehicles/', vehiclesData, { headers: { Authorization: `Bearer ${token}` } });
