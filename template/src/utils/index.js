/**
 * 公共处理模块
 */


/**
 * 权限列表存储
 * @param {Array} permission
 */
export function permissionAction(permissions) {
  if (permissions) {
    try {
      permissions = JSON.parse(sessionStorage.getItem('prems'));
    } catch (e) {}
  } else {
    sessionStorage.setItem('prems', JSON.stringify(permissions));
  }
}

/**
 * 验证权限
 * @param {String} permission
 */
export function isPerms(permission) {
  const permissions = exports.permissions() || [];
  return permissions.indexOf(permission) !== -1;
}

/**
 * 获取所有可
 * @param {Array} menus
 */
export function getMenuFilter(menus) {
  const rs = [];
  _resursion(menus);

  function _resursion(list) {
    list.forEach(item => {
      if (item.pid !== 0 && item.url) {
        rs.push(item);
      }
      const children = item.children;
      if (children && children.length > 0) {
        _resursion(children);
      }
    });
  }
  return rs;
}

/**
 * 根据菜单的order进行排序
 * @param {Array} menus
 */
export function sortMenuList(menus) {

  _resursion(menus);

  function _resursion(list) {
    list = list.sort((a, b) => a.order - b.order > 0);
    list.forEach(item => {
      item.children && _resursion(item.children);
    });
  }

  return menus;
}

/**
 * 通过id递归获取标签
 * @param {String|Number} id
 * @param {Array} menus
 */
export function findTabById(id, menus) {
  let tab = null;
  _resursion(menus);

  function _resursion(list) {
    list.forEach(item => {
      if (String(id) === String(item.id)) {
        tab = item;
        return true;
      }
      const children = item.children;
      if (children) {
        _resursion(children);
      }
    });
  }

  return tab;
}

/**
 * 通过name递归获取标签
 * @param {String} name
 * @param {Array} menus
 */
export function findTabByName(name, menus) {
  let tab = null;
  _resursion(menus);

  function _resursion(list) {
    list.forEach(item => {
      const urlLast = item.url.split('/');
      if (name === urlLast[urlLast.length - 1]) {
        tab = item;
        return true;
      }
      const children = item.children;
      if (children) {
        _resursion(children);
      }
    });
  }

  return tab;
}

/**
 * 通过url递归获取菜单为irfame的
 * @param {String} url
 * @param {Array} menus
 */
export function getRouteByURL(menus) {
  let rs = [];
  _resursion(menus);

  function _resursion(list) {
    list.forEach(item => {
      if (/^https?:/.test(item.url)) {
        rs.push(item);
      }
      const children = item.children;
      if (children) {
        _resursion(children);
      }
    });
  }
  return rs;
}

/**
 * url => route path
 * @param {*} url
 * @param {*} reg
 */
export function urlToPath(url, reg) {
  if (!url) return '/view/home';
  if (/^(https?|ftp):\/\//.test(url)) return url;
  return url.replace(reg || /^modules\//i, '/view/');
}
