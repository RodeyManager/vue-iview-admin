<template>
  <!-- 展开状态 -->
  <div class="menu" v-if="!siderSwitched">
    <i-menu theme="dark" accordion @on-select="onSelect" @on-open-change="onOpenChange">
      <i-menu-item name="0-0">
        <i-icon type="ios-home"></i-icon> {{ !siderSwitched ? '首页' : '' }}
      </i-menu-item>
      <sub-menu-nav v-for="menu in menuList" :key="menu.name" :menu="menu"></sub-menu-nav>
    </i-menu>
  </div>
  <!-- 收缩状态 -->
  <div class="menu switched" v-else>
    <ul>
      <li>
        <i-poptip trigger="hover" placement="right-start" transfer popper-class="menu-switch-poptip">
          <i-icon type="ios-home" size="26"></i-icon>
          <template slot="content">
            <ul class="menu-child-poptip">
              <li @click="onSelectPopMenu()">
                <i-icon type="ios-home" size="16"></i-icon> 首页
              </li>
            </ul>
          </template>
        </i-poptip>
      </li>
      <li v-for="menu in menuList" :key="menu.id">
        <i-poptip trigger="hover" placement="right-start" :content="menu.name" transfer popper-class="menu-switch-poptip">
          <menu-icon :icon="menu.icon" size="26"></menu-icon>
          <template slot="content" v-if="menu.children">
            <ul class="menu-child-poptip">
              <li v-for="child in menu.children" :key="child.id" @click="onSelectPopMenu(child)">
                <menu-icon :icon="child.icon" size="16"></menu-icon> {{ child.name }}
              </li>
            </ul>
          </template>
        </i-poptip>
      </li>
    </ul>

  </div>
</template>

<script>

import { mapMutations, mapActions, mapGetters } from 'vuex';
import { findTabById, urlToPath } from '@/utils';
import SubMenuNav from './sub-menu-nav.vue';
import MenuIcon from './menu-icon.vue';

export default {
  components: { SubMenuNav, MenuIcon },
  props: {
    menuList: { type: Array, required: true }
  },
  created() {},
  methods: {
    ...mapMutations(['ADD_TAB', 'ACTIVE_TAB']),
    ...mapActions(['tabAction', 'navigateToRoute']),
    // 选择菜单回调
    // iview menu的name属性指定了菜单的id值
    onSelect(name){
      const menus = this.$store.state.menuList;
      const tabList = this.$store.state.tabList;
      const tab = findTabById(name, menus);

      // 非首页
      if(name !== '0-0'){
        this.tabAction(tab);
        this.navigateToRoute({ url: tab.url, route: this.$route });
      }else{
        this.ACTIVE_TAB(null);
        this.navigateToRoute({ route: this.$route });
      }

    },
    // 打开折叠回调
    onOpenChange(name){},
    onSelectPopMenu(menuItem){
      if(menuItem){
        this.onSelect(menuItem.id);
      }else{
        this.ACTIVE_TAB(null);
        this.navigateToRoute({ route: this.$route });
      }
    },
  },
  computed: { ...mapGetters(['siderSwitched', 'tabCurrent']) }
}
</script>
