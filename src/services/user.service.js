import axios from 'axios';
import authHeader from './auth-header';

const API_URL = " http://dd65cebd6358.ngrok.io/api/test/";
const API_URL_2 = "http://dd65cebd6358.ngrok.io/api/auth/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard(){
    return axios.post( API_URL_2 + "getdata", { headers: authHeader()});
  }

  setAllowed(username){
    return axios.post( API_URL_2 + "setallowed",{ headers: authHeader(), username: username, });
  }

  setUnallowed(username){
    return axios.post( API_URL_2 + "setunallowed", { headers: authHeader(), username: username,});
  }

  datamanage(_sendData){
    return axios.post( API_URL_2 + "datamanage",{ headers: authHeader(), _data : _sendData,});
  }

  _get_data(){
    return axios.post( API_URL_2 + "_get_data", { headers: authHeader()});
  }

  _get_first_data(){
    return axios.post( API_URL_2 + "_get_first_data", { headers: authHeader()});
  }
}

export default new UserService();
