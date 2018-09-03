/**
 * Created by Rodey on 2018/2/28
 */

import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import {
  urlToPath
} from '@/utils';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 菜单列表
    menuList: [],
    // 模块标签列表
    tabList: [],
    tabCurrent: {},
    // sider switch, 默认展开
    siderSwitched: false,
    iframeSrc: ''
  },
  mutations: {
    // 更新导航菜单
    [types.UPDATE_MENU_LIST](state, list) {
      state.menuList = list;
    },
    // 添加标签
    [types.ADD_TAB](state, tab) {
      state.tabCurrent = tab;
      state.tabList.push(tab);
    },
    // 移除标签
    [types.REMOVE_TAB](state, tab) {
      const index = state.tabList.indexOf(tab);
      index !== -1 && state.tabList.splice(index, 1);
      // 顺序 next -> prevaius -> last
      let current = state.tabList[index] || state.tabList[index - 1] || state.tabList[state.tabList.length - 1];
      state.tabCurrent = current;
    },
    // 激活标签
    [types.ACTIVE_TAB](state, tab) {
      state.tabCurrent = tab;
    },
    [types.SWITCH_SIDER](state) {
      state.siderSwitched = !state.siderSwitched;
    },
    [types.UPDATE_IFRAME_SRC](state, url) {
      state.iframeSrc = url;
    }
  },
  actions: {
    // tab action
    tabAction({
      commit,
      state
    }, tab) {
      const index = state.tabList.find(item => item.id === tab.id);
      if (index) {
        commit(types.ACTIVE_TAB, tab);
      } else {
        commit(types.ADD_TAB, tab);
      }
    },
    // 转到对应的路由
    navigateToRoute({
      commit
    }, payload) {
      const {
        url,
        route
      } = payload;
      const {
        query
      } = route;
      commit(types.UPDATE_IFRAME_SRC, url);
      if (/^https?:/.test(url)) {
        router.push({
          name: 'iframe',
          params: {
            src: url,
            _t_: Date.now()
          },
          props: true,
          query
        });
      } else {
        const path = urlToPath(url);
        router.push({
          path,
          query
        });
      }
    }
  },
  getters: {
    siderSwitched: state => state.siderSwitched,
    menuList: state => state.menuList,
    tabList: state => state.tabList,
    tabCurrent: state => state.tabCurrent,
    hasTab: state => {
      const {
        tabList
      } = state;
      return tabList && tabList.length > 0 && tabList.find(tab => tab.id !== '0-0');
    },
    iframeSrc: state => state.iframeSrc
  }
});

export default store;
