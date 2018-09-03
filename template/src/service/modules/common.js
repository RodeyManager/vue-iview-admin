import request from '../app.service';
import {
  common
} from '../api';
import {
  requestURL
} from '../app.service';


export function login(data) {
  // return request.post(common.login, {
  //   ...data
  // });
  return request({
    url: common.login,
    params: data,
    method: 'GET'
  });
}

export function logout(data) {
  return request.post(common.logout, {
    ...data
  });
}

// 获取验证码
export const captcha = requestURL(common.captcha + '?' + Date.now());
