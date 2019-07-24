import request from './axiosConfig';
import urls from './url';
import {AsyncStorage} from 'react-native';

const baseURL = urls.baseUrl;

const get = async (url, params = {}) => {
  const t = await AsyncStorage.getItem('token');
  const token = 'Bearer ' + t;
  if (token != null) {
    const config = {
      url,
      baseURL,
      method: 'get', // default
      headers: {'Authorization': token},
      params,
      timeout: 10000, // default is `0` (no timeout)
      withCredentials: false, // default
      responseEncoding: 'utf8', // default
      maxRedirects: 2, // default
    };
    return request(config);
  }
};

const post = async (url, body) => {
  const t = await AsyncStorage.getItem('token');
  const token = 'Bearer ' + t;
  if (token) {
    const config = {
      url,
      baseURL,
      method: 'post',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify(body),
      timeout: 10000,
      withCredentials: false,
      responseEncoding: 'utf8',
      maxRedirects: 2,
    };
    return request(config);
  }
};

const put = async (url, body) => {
  const t = await AsyncStorage.getItem('token');
  const token = 'Bearer ' + t;
  if (token) {
    const config = {
      url,
      baseURL,
      method: 'put',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify(body),
      timeout: 10000,
      withCredentials: false,
      responseEncoding: 'utf8',
      maxRedirects: 2,
    };
    return request(config);
  }
};

const patch = async (url, body) => {
  const t = await AsyncStorage.getItem('token');
  const token = 'Bearer ' + t;
  if (token) {
    const config = {
      url,
      baseURL,
      method: 'patch',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify(body),
      timeout: 10000,
      withCredentials: false,
      responseEncoding: 'utf8',
      maxRedirects: 2,
    };
    return request(config);
  }
};

const NetworkClient = {
  get, post, put, patch,
};

export default NetworkClient;