/**
 * API 接口地址定义
 * key(接口名称) : value(接口地址)
 */
export const test = {
  list: 'test/test',
  info: 'test/test',
  update: 'test/test',
  del: 'test/test',
  vip: {
    list: 'test/test'
  }
};

export const common = {
  login: 'common/login',
  logout: 'common/logout',
  captcha: 'common/captcha.jpg'
}

export const sys = {
  menu: {
    list: 'sys/menu/list'
  },
  user: {
    getUserInfo: 'sys/user/getUserInfo',
    info: 'sys/user/info'
  }
};

/**
 * 请求返回的错误码及相关提示语
 */
export const ERROR_CODE = {
  '1001': '参数错误',
  '1002': '登录已失效，请重新登录'
};
