/**
 * Created by Rodey on 2018/2/28
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有开发环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV);

export function importCMP(cmp) {
  return _import(cmp);
}

const routerMapping = [{
  path: '*',
  redirect: {
    name: '404'
  }
}, {
  path: '/404',
  component: _import('404/index'),
  name: '404',
  desc: 'Not Found Page'
}, {
  path: '/login',
  component: _import('login/index'),
  name: 'login',
  desc: '登录'
}, {
  path: '/',
  component: _import('layout/index'),
  name: 'layout',
  desc: '布局',
  redirect: {
    name: 'home'
  },
  children: [{
      // iframe 固定
      path: '/iframe-link',
      component: _import('iframe/index'),
      name: 'iframe',
      desc: 'iframe url',
      props: true
    }, {
      path: '/view/home',
      component: _import('home/index'),
      name: 'home',
      desc: '首页'
    },
    // 系统管理---------------------
    {
      path: '/view/sys/menu',
      component: _import('home/index'),
      name: 'menu',
      desc: '菜单管理'
    },
    {
      path: '/view/sys/user',
      component: _import('home/index'),
      name: 'user',
      desc: '用户管理'
    },
    {
      path: '/view/sys/role',
      component: _import('home/index'),
      name: 'role',
      desc: '角色管理'
    },
    // 内容管理------------------
    {
      path: '/view/content/article',
      component: _import('home/index'),
      name: 'article',
      desc: '文章管理'
    },
    {
      path: '/view/content/comment',
      component: _import('home/index'),
      name: 'comment',
      desc: '评论管理'
    },
    {
      path: '/view/content/report',
      component: _import('home/index'),
      name: 'report',
      desc: '举报管理'
    },
    // 统计分析------------------
    {
      path: '/view/analyse/date',
      component: _import('home/index'),
      name: 'date',
      desc: '按日期统计'
    }, {
      path: '/view/analyse/activity',
      component: _import('home/index'),
      name: 'activity',
      desc: '活跃分析'
    }
  ],
  beforeEnter: (to, from, next) => {
    let token = Vue.cookie.get('token');
    if (!token && from.name !== 'login') {
      next({
        name: 'login'
      });
    }
    next();
  }
}];

const router = new VueRouter({
  mode: 'hash',
  routes: routerMapping,
});

export default router;
