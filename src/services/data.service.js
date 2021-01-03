import axios from 'axios';
import authHeader from './auth-header';

const API_URL = " http://dd65cebd6358.ngrok.io/api/test/";

class DataService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getData() {
    return axios.get(API_URL + 'initial_data', { headers: authHeader() });
  }

  addRow(data){
    return axios.get(API_URL + 'addrow', { headers : authHeader(), data : data});
  }

  updaterow(){
    return axios.get(API_URL + 'updaterow', { headers : authHeader()});
  }

  deleterow(){
    return axios.get(API_URL + 'deleterow', { headers : authHeader()});
  }
}

export default new DataService();
